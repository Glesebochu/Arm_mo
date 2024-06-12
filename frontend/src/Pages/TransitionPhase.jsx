import React, { useState, useEffect } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Step1Box } from "@/components/TransitionSteps/Step1Box";
import { Step2Box } from "@/components/TransitionSteps/Step2Box";
import { Step3Box } from "@/components/TransitionSteps/Step3Box";
import { Step4Box } from "@/components/TransitionSteps/Step4Box";
import { ChevronRight, ChevronLeft, Pause, Play } from "lucide-react"
import { typeOptions } from '../../constants/constants';

export function TransitionPhase({ goals }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [currentGoalIndex, setCurrentGoalIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const iconHeight = "h-10";
    const iconWidth = "w-6";

    const createObservableObject = async (object) => {
        const response = await axios.post(
            "/backend/ObservableObject/Create",
            object
        );
        return response.data;
    };
    const updateObservableObject = async (object) => {
        const response = await axios.post(
            "/backend/ObservableObject/Update",
            object
        );
        return response.data;
    };

    const updateGoalStatus = async (goal) => {
        const response = await axios.put("/backend/Goals/Update", { goal });
        return response.data;
    };

    const handleNextStep = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const handlePreviousStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleGoalCompletion = async () => {
        const currentGoal = goals[currentGoalIndex];
        await axios.put("/backend/Goals/Update", {
            id: currentGoal.id,
            status: "Completed",
        });
        setCurrentGoalIndex(currentGoalIndex + 1);
    };

    const handleTimerEnd = () => {
        alert("Timer ended");
    };

    return (
        <div className="transition-phase grid grid-cols-10 grid-rows-9 h-[90vh] w-full">
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
                {currentStep === 2 && <Step2Box onDone={handleNextStep} />}
                {currentStep === 3 && (
                    <Step3Box
                        observableObjects={[]}
                        onDone={handleNextStep}
                        onAddObservableObject={() => { }}
                    />
                )}
                {currentStep === 4 && (
                    <Step4Box
                        goal={goals[currentGoalIndex]}
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

            {currentStep === 4 && (
                <div className="col-span-5 row-start-5 flex justify-center items-center">
                    <Checkbox label="Go to next goal" className="text-gray-700" />
                </div>
            )}
        </div>
    );
}
