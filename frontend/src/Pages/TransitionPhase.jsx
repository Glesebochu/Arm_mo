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
import { typeOptions, subTypeOptions } from '../../constants/constants';

// * For testing purposes
import { useDispatch, useSelector } from "react-redux";
import { getAllGoals, updateGoal } from "../../slices/GoalsSlice.js";
import { createObservableObject } from "../../slices/ObservableObjectsSlice.js";
// * Until here

export function TransitionPhase({ preparationPhase }) {

    // TODO: Remove this after testing
    preparationPhase = {
        Duration: 30,
        Motivation: "",
        Goals: useSelector(state => state.Goals.goals).filter(g => g.id < 11),
        Expectation: "",
        Distractions: [{ title: "", type: "" }], // Initialize with an empty row
        StartDateTime: "",
        EndDateTime: "",
    };

    const [currentStep, setCurrentStep] = useState(1);
    const [currentGoalIndex, setCurrentGoalIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [timeLeft, setTimeLeft] = useState(preparationPhase.Duration * 60);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const iconHeight = "h-10";
    const iconWidth = "w-6";

    const handleNextStep = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const handlePreviousStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleGoalCompletion = (goal) => {
        setCurrentGoalIndex(currentGoalIndex + 1);
    };

    const extractMeditationObject = () => {
        return {
            title: "Chapter 1 of 12 Rules for Life",
            description: "Fascinating as hell of a novel.",
            subType: "Thought",
        }
    }

    // ! For testing purposes only
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllGoals());
    }, [dispatch]);
    // ! Until here

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

    return (
        <div className="transition-phase grid grid-cols-10 grid-rows-9 h-[90vh] w-full">

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
                {currentStep === 2 && <Step2N3Box meditationObject={extractMeditationObject()} stepNo={2} />}
                {currentStep === 3 && <Step2N3Box meditationObject={extractMeditationObject()} stepNo={3} />}
                {currentStep === 4 && (
                    <Step4Box
                        goals={preparationPhase.Goals}
                        onComplete={handleGoalCompletion}
                        onTimerEnd={handleTimerEnd}
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

            <TimeIsUpAlertDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} extendBy={extendTimer} />

        </div>
    );
}
