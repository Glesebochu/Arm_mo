import React, { useState, useEffect } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Step1Box } from "@/components/TransitionSteps/Step1Box";
import { Step2N3Box } from "@/components/TransitionSteps/Step2N3Box";
import { Step4Box } from "@/components/TransitionSteps/Step4Box";
import { TimeIsUpAlertDialog } from "@/components/TimeIsUpAlertDialog"
import { ChevronRight, ChevronLeft, Pause, Play, X } from "lucide-react"
import { typeOptions, subTypeOptions, statusOptions } from '../../constants/constants';

// For creating the session on the backend
import { createSession } from "../../slices/SessionsSlice";

import { useDispatch, useSelector } from "react-redux";
// * For testing purposes
import { getAllGoals, updateGoal } from "../../slices/GoalsSlice.js";

// * For navigating to another page
import { useLocation, useNavigate } from 'react-router-dom';
import { PauseMenu } from "@/components/TransitionSteps/PauseMenu";
import { AhaMomentAlertDialog } from "@/components/AhaMomentAlertDialog";
import ViewStageInfo from "./ViewStageInfo";
import { GoalsTable } from "@/components/GoalsTable";

export function TransitionPhase() {

    const dispatch = useDispatch();
    const location = useLocation();
    var preparationPhase = location.state;
    var practicingStage = useSelector(state => state.Session.practicingStage);

    // TODO: Remove this after testing
    // preparationPhase = {
    //     duration: {
    //         hour: 1,
    //         minute: 30
    //     },
    //     motivation: "To unify this mind.",
    //     goals: useSelector(state => state.Goals.goals).filter(g => g.id < 4),
    //     expectation: "None",
    //     distractions: [
    //         {
    //             title: "Eneksh eneka",
    //             type: "WorldlyDesire"
    //         }
    //     ], // Initialize with an empty row
    //     startDateTime: new Date().toISOString(),
    //     endDateTime: new Date().toISOString(),
    // };

    const navigate = useNavigate();


    const [currentStep, setCurrentStep] = useState(1);
    const [goals, setGoals] = useState(preparationPhase.goals);
    const [isPaused, setIsPaused] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [step2Objects, setStep2Objects] = useState([]);
    const [step3Objects, setStep3Objects] = useState([]);
    const [currentObservableObjects, setCurrentObservableObjects] = useState([]);
    const [ahaMoments, setAhaMoments] = useState([]);
    const [activePauseMenuComponent, setActivePauseMenuComponent] = useState(null);

    // TODO: Remove this after testing
    // useEffect(() => {
    //     dispatch(getAllGoals());
    //     setGoals(preparationPhase.goals)
    // }, [dispatch]);
    // ! Until here

    function calculateTotalSeconds(duration) {
        let totalSeconds = 0;

        if (duration.hour !== null && duration.hour !== undefined) {
            totalSeconds += duration.hour * 3600;
        }
        if (duration.minute !== null && duration.minute !== undefined) {
            totalSeconds += duration.minute * 60;
        }
        if (duration.second !== null && duration.second !== undefined) {
            totalSeconds += duration.second;
        }
        if (duration.millisecond !== null && duration.millisecond !== undefined) {
            totalSeconds += duration.millisecond / 1000;
        }

        return totalSeconds;
    }
    const [timeLeft, setTimeLeft] = useState(calculateTotalSeconds(preparationPhase.duration));

    const [isAhaMomentDialogOpen, setIsAhaMomentDialogOpen] = useState(false);

    const iconHeight = "h-10";
    const iconWidth = "w-6";

    const handleAddAhaMoment = () => {
        setIsAhaMomentDialogOpen(true);
    };

    const addAhaMoment = (ahaMoment) => {
        // Handle the logic to add an Aha moment here
        setAhaMoments([...ahaMoments, {
            label: ahaMoment
        }]);
        console.log('Aha moment added:', ahaMoment);
    };


    const saveObservableObjects = () => {
        if (currentStep === 2) {
            setStep2Objects(currentObservableObjects);
        } else if (currentStep === 3) {
            setStep3Objects(currentObservableObjects);
        }
        setCurrentObservableObjects([]);
    };

    const handleNextStep = () => {
        saveObservableObjects();
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const handlePreviousStep = () => {
        saveObservableObjects();
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handlePause = () => {
        if (activePauseMenuComponent) {
            setActivePauseMenuComponent(null);
        } else {
            setIsPaused(!isPaused);
        }
    }

    const handleRestart = () => {
        setCurrentStep(1);
        setStep2Objects([]);
        setStep3Objects([]);
        setCurrentObservableObjects([]);
        setIsPaused(false);
        setTimeLeft(calculateTotalSeconds(preparationPhase.duration));
        setActivePauseMenuComponent(null); // Reset active component
    };

    // * For the pause menu pages
    const handleViewInfo = () => {
        setActivePauseMenuComponent('ViewInfo');
    };

    const handleShowGoals = () => {
        console.log(goals);
        setActivePauseMenuComponent('ShowGoals');
    };

    const handleNextStage = () => {
        setActivePauseMenuComponent('NextStage');
    };

    const updateGoalsStatus = (updatedGoals) => {
        const newGoals = updatedGoals.map(goal => ({
            ...goal,
            status: "Completed"
        }));
        setGoals(newGoals);

        endMeditation();
    };

    const extractMeditationObject = () => {
        return preparationPhase.goals[0].meditationObject;
    }

    // Timer code
    const handleTimerEnd = () => {
        setIsDialogOpen(true);
    };

    const extendTimer = (extension) => {
        setTimeLeft(extension * 60);
        preparationPhase.duration = {
            ...preparationPhase.duration,
            minute: preparationPhase.duration.minute + extension
        }
        console.log(preparationPhase.duration);
    };

    useEffect(() => {
        if (timeLeft > 0 && !isPaused) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            handleTimerEnd();
        }
    }, [timeLeft, isPaused]);


    function durationToTicks(duration) {
        const hours = duration.hour || 0;
        const minutes = duration.minute || 0;
        const seconds = duration.second || 0;
        const milliseconds = duration.millisecond || 0;

        const totalMilliseconds = (((hours * 60) + minutes) * 60 + seconds) * 1000 + milliseconds;
        const ticks = totalMilliseconds * 10000; // 1 tick = 100 nanoseconds = 0.0001 milliseconds

        return ticks;
    }


    // The function that brings it all together
    const endMeditation = () => {
        // Create a session object
        // Set all its properties by using the state variables and the store: meditatorId, preparationPhase,
        var session = {
            startDateTime: preparationPhase.startDateTime,
            endDateTime: new Date().toISOString(),
            meditatorId: 1,
            ahaMoments: ahaMoments,
            practicedStageIds: [
                practicingStage
            ],
            newlyMasteredStageIds: [],
            observableObjects: [
                ...step2Objects,
                ...step3Objects
            ],
            preparationPhase: {
                ...preparationPhase,
                goals: preparationPhase.goals.map(g => g.id),
                duration: durationToTicks(preparationPhase.duration)
            },
            isDeleted: false
        };

        // Update the goals
        goals.forEach(goal => {
            dispatch(updateGoal(goal));
        });

        console.log(session);

        // Create the session in the backend and navigate to the session page with the session ID
        dispatch(createSession(session)).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                const sessionId = result.payload.id; // Adjust this based on your API response
                navigate(`/Session/${sessionId}`);
            } else {
                console.error('Failed to create session:', result.payload);
            }
        });
    };

    return (
        <div className="transition-phase pt-5 pb-5 grid grid-cols-10 grid-rows-9 h-[100vh] w-full">

            <h3
                className="col-start-4 col-span-4 row-start-1 self-center text-center m-4"
            >{Math.round(timeLeft / 60)} mins left</h3>

            <Button
                onClick={handlePause}
                variant="ghost"
                className="col-start-10 row-start-1 self-center justify-self m-4"
            >
                {isPaused ? <Play className={`${iconHeight} ${iconWidth}`} /> : <Pause className={`${iconHeight} ${iconWidth}`} />}
            </Button>

            {!isPaused &&
                <Button
                    onClick={handlePreviousStep}
                    disabled={currentStep === 1}
                    variant="ghost"
                    className="col-start-1 row-start-5 self-center justify-self m-4"
                >
                    <ChevronLeft className={`${iconHeight} ${iconWidth}`} />
                </Button>
            }

            {isPaused ?
                (
                    < div className="col-start-2 col-span-8 row-start-2 row-span-7 flex justify-center overflow-y-auto no-scrollbar">
                        {activePauseMenuComponent === 'ViewInfo' && <ViewStageInfo stageIdParam={practicingStage} />}
                        {activePauseMenuComponent === 'ShowGoals' && <GoalsTable goals={goals} doNotIncludeStatus="" isSubGoals={true} />}
                        {/* {activePauseMenuComponent === 'NextStage' && <NextStageComponent />} */}
                        {activePauseMenuComponent === null &&
                            <PauseMenu
                                onEnd={endMeditation}
                                onViewInfo={handleViewInfo}
                                onShowGoals={handleShowGoals}
                                onRestart={handleRestart}
                                onNextStage={handleNextStage}
                            />
                        }

                    </div>
                )
                :
                (
                    <div className="col-start-2 col-span-8 row-start-2 row-span-7 flex items-center justify-center">

                        {currentStep === 1 && <Step1Box onDone={handleNextStep} meditationObjectType={typeOptions[0]} />}
                        {currentStep === 2 &&
                            <Step2N3Box
                                meditationObject={extractMeditationObject()}
                                stepNo={2}
                                initialObjects={step2Objects}
                                setCurrentObservableObjects={setCurrentObservableObjects}
                            />}
                        {currentStep === 3 &&
                            <Step2N3Box
                                meditationObject={extractMeditationObject()}
                                stepNo={3}
                                initialObjects={step3Objects}
                                setCurrentObservableObjects={setCurrentObservableObjects}
                            />}
                        {currentStep === 4 && (
                            <Step4Box
                                goals={preparationPhase.goals}
                                onComplete={updateGoalsStatus}
                            />
                        )}
                    </div>
                )}

            {!isPaused &&
                <Button
                    onClick={handleNextStep}
                    disabled={currentStep === 4}
                    variant="ghost"
                    className="col-start-10 row-start-5 self-center justify-self m-4"
                >
                    <ChevronRight className={`${iconHeight} ${iconWidth}`} />
                </Button>
            }

            {!isPaused &&
                <div
                    className="row-start-9 col-start-2 col-span-8 mt-5"
                >

                    <AhaMomentAlertDialog
                        isOpen={isAhaMomentDialogOpen}
                        setIsOpen={setIsAhaMomentDialogOpen}
                        addAhaMoment={addAhaMoment}
                    />
                </div>
            }

            <TimeIsUpAlertDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} extendBy={extendTimer} onSessionEnd={endMeditation} />


        </div>
    );
}
