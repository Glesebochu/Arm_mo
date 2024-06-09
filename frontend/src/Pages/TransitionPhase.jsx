import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { TransitionStepCard } from '@/components/TransitionStepCard'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Step1Box } from '@/components/TransitionSteps/Step1Box';
import { Step2Box } from '@/components/TransitionSteps/Step2Box';
import { Step3Box } from '@/components/TransitionSteps/Step3Box';
import { Step4Box } from '@/components/TransitionSteps/Step4Box';


export function TransitionPhase({ goals }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [currentGoalIndex, setCurrentGoalIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const createObservableObject = async (object) => {
        const response = await axios.post('/backend/ObservableObject/Create', object);
        return response.data;
    };
    const updateObservableObject = async (object) => {
        const response = await axios.post('/backend/ObservableObject/Update', object);
        return response.data;
    };

    const updateGoalStatus = async (goal) => {
        const response = await axios.put('/backend/Goals/Update', { goal });
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
        await axios.put('/backend/Goals/Update', { id: currentGoal.id, status: 'Completed' });
        setCurrentGoalIndex(currentGoalIndex + 1);
    };

    const handleTimerEnd = () => {
        alert("Timer ended");
    };

    return (
        <div className="transition-phase grid grid-cols-5 grid-rows-5 h-screen w-full">
            <Button
                onClick={() => setIsPaused(!isPaused)}
                className="col-span-5 row-start-1 row-span-1 justify-self-end m-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700"
            >
                {isPaused ? 'Resume' : 'Pause'}
            </Button>

            <Button
                onClick={handlePreviousStep}
                disabled={currentStep === 1}
                className="col-start-1 row-start-3 row-span-1 self-center justify-self-start ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
                Previous
            </Button>

            <div className="col-start-2 col-span-3 row-start-2 row-span-3 flex items-center justify-center">
                {currentStep === 1 && <Step1Box onDone={handleNextStep} />}
                {currentStep === 2 && <Step2Box onDone={handleNextStep} />}
                {currentStep === 3 && <Step3Box observableObjects={[]} onDone={handleNextStep} onAddObservableObject={() => { }} />}
                {currentStep === 4 && <Step4Box goal={goals[currentGoalIndex]} onComplete={handleGoalCompletion} onTimerEnd={handleTimerEnd} />}
            </div>

            <Button
                onClick={handleNextStep}
                disabled={currentStep === 4}
                className="col-start-5 row-start-3 row-span-1 self-center justify-self-end mr-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
                Next
            </Button>

            {currentStep === 4 && (
                <div className="col-span-5 row-start-5 row-span-1 flex justify-center items-center">
                    <Checkbox label="Go to next goal" className="text-gray-700" />
                </div>
            )}
        </div>
    );
};


