import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";

export function Step4Box({ goals, onComplete }) {
    const [currentGoalIndex, setCurrentGoalIndex] = useState(0);
    const [checkedStates, setCheckedStates] = useState(Array(goals.length).fill(false));

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            onTimerEnd();
        }
    }, [timeLeft, onTimerEnd]);

    return (
        <div className="step-box w-full h-full flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg">
            <div className="text-lg text-gray-700 mb-4">
                Focus on the activity and the meditation object.
            </div>
            <div className="text-center mb-4">
                <div className="text-2xl text-gray-800 mb-2">{goal.meditationObject.title}</div>
                <div className="text-gray-600">{goal.meditationObject.description}</div>
            </div>
            <div className="timer text-4xl text-gray-800 mb-4">
                {timeLeft}s
            </div>
            <Button onClick={onComplete} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                Complete
            </Button>
            <Button onClick={onTimerEnd} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                End Meditation
            </Button>
        </div>
    );
};
