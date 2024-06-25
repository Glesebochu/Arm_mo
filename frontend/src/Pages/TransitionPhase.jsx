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
import { ChevronRight, ChevronLeft, Pause, Play } from "lucide-react"
import { typeOptions, subTypeOptions, statusOptions } from '../../constants/constants';

// For creating the session on the backend
import { createSession } from "../../slices/SessionsSlice";

import { useDispatch, useSelector } from "react-redux";
// * For testing purposes
import { getAllGoals, updateGoal } from "../../slices/GoalsSlice.js";

// * For navigating to another page
import { useNavigate } from 'react-router-dom';

export function TransitionPhase({ preparationPhase }) {

    // TODO: Remove this after testing
    preparationPhase = {
        duration: {
            ticks: 30
        },
        motivation: "",
        goals: useSelector(state => state.Goals.goals).filter(g => g.id < 4),
        expectation: "",
        distractions: [
            {
                title: "Eneksh eneka",
                type: "WorldlyDesire"
            }
        ], // Initialize with an empty row
        startDateTime: "",
        endDateTime: "",
    };

    const [currentStep, setCurrentStep] = useState(1);
    const [goals, setGoals] = useState(preparationPhase.goals);
    const [isPaused, setIsPaused] = useState(false);
    const [timeLeft, setTimeLeft] = useState(preparationPhase.duration.ticks * 60);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [step2Objects, setStep2Objects] = useState([]);
    const [step3Objects, setStep3Objects] = useState([]);
    const [currentObservableObjects, setCurrentObservableObjects] = useState([]);

    // ! For testing purposes only
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllGoals());
    }, [dispatch]);
    // ! Until here

    const iconHeight = "h-10";
    const iconWidth = "w-6";

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

    const updateGoalsStatus = (updatedGoals) => {
        const newGoals = updatedGoals.map(goal => ({
            ...goal,
            status: "Completed"
        }));
        setGoals(newGoals);

        endMeditation();

    };


    const extractMeditationObject = () => {
        return {
            title: "Chapter 1 of 12 Rules for Life",
            description: "Fascinating as hell of a novel.",
            subType: "Thought",
        }
    }

    // Timer code
    const handleTimerEnd = () => {
        setIsDialogOpen(true);
    };

    const extendTimer = (extension) => {
        setTimeLeft(extension * 60);
    };

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            handleTimerEnd();
        }
    }, [timeLeft]);


    // The function that brings it all together
    const endMeditation = () => {
        // Create a session object
        // Set all its properties by using the state variables and the store: meditatorId, preparationPhase,
        var session = {
            startDateTime: preparationPhase.startDateTime,
            endDateTime: "2024-0625T14:18.886Z",
            meditatorId: 0,
            ahaMoments: [],
            practicedStageIds: [
                1,
                2
            ],
            newlyMasteredStageIds: [
                2
            ],
            observableObjects: [
                ...step2Objects,
                ...step3Objects
            ],
            preparationPhase: preparationPhase,
            isDeleted: false
        };

        // Update the goals
        goals.forEach(goal => {
            dispatch(updateGoal(goal));
        });

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
        <div className="transition-phase grid grid-cols-10 grid-rows-9 h-[100vh] w-full">

            <h3
                className="col-start-4 col-span-4 row-start-1 self-center text-center m-4"
            >{Math.round(timeLeft / 60)} mins left</h3>

            <Button
                onClick={() => setIsPaused(!isPaused)}
                variant="ghost"
                className="col-start-10 row-start-1 self-center justify-self m-4"
            >
                {isPaused ? <Play className={`${iconHeight} ${iconWidth}`} /> : <Pause className={`${iconHeight} ${iconWidth}`} />}
            </Button>

            <Button
                onClick={handlePreviousStep}
                disabled={currentStep === 1}
                variant="ghost"
                className="col-start-1 row-start-5 self-center justify-self m-4"
            >
                <ChevronLeft className={`${iconHeight} ${iconWidth}`} />
            </Button>

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

            <Button
                onClick={handleNextStep}
                disabled={currentStep === 4}
                variant="ghost"
                className="col-start-10 row-start-5 self-center justify-self m-4"
            >
                <ChevronRight className={`${iconHeight} ${iconWidth}`} />
            </Button>

            <TimeIsUpAlertDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} extendBy={extendTimer} onSessionEnd={endMeditation} />

        </div>
    );
}
