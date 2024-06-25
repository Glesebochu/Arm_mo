import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";

export function Step4Box({ goals, onComplete, onSessionEnd }) {
    const [currentGoalIndex, setCurrentGoalIndex] = useState(0);
    const [checkedStates, setCheckedStates] = useState(Array(goals.length).fill(false));

    const handleGoalCompletion = (index) => {
        if (index < goals.length - 1) {
            setCurrentGoalIndex(index + 1);
        } else {
            onComplete(goals); // Call onComplete to update the status of all goals
        }
        const newCheckedStates = [...checkedStates];
        newCheckedStates[index] = true;
        setCheckedStates(newCheckedStates);
    };


    const handleCheckboxChange = (index) => {
        console.log(`changed checkbox-${index} from ${checkedStates[index]} `);
        if (index === currentGoalIndex) {
            // This is for checking the current goal
            handleGoalCompletion(index);
        } else {
            // This is for unchecking previously checked goals
            const newCheckedStates = [...checkedStates];
            newCheckedStates.fill(false, index);
            setCheckedStates(newCheckedStates);
            setCurrentGoalIndex(index);
        }
    };

    return (
        <div
            className="
                step-box 
                w-full h-full 
                grid grid-cols-1 grid-rows-5 
                border rounded-xl
                p-6 gap-6
            "
        >

            {/* Current goal section */}
            <Card
                className="
                    row-start-1 col-start-1
                    flex items-center justify-center w-full h-full p-4 text-lg self-start
                "
            >
                <p>{goals[currentGoalIndex].activity.title} <span className='font-bold text-primary'>{goals[currentGoalIndex].meditationObject.title}</span></p>
                <Checkbox
                    name="nextGoal"
                    className="h-6 w-6 rounded-2xl ml-4"
                    checked={checkedStates[currentGoalIndex]}
                    onClick={() => handleCheckboxChange(currentGoalIndex)}
                />
            </Card>

            {/* Completed goals section */}
            <div
                className="
                    row-start-2 row-span-4 col-start-1
                    flex flex-col w-full
                    items-start
                    overflow-y-auto
                    gap-3
                    grayscale
                "
            >
                {goals.slice(0, currentGoalIndex).map((goal, index) => (
                    <Card key={index} className="flex w-full p-4 line-through text-sm items-center">
                        <Checkbox
                            name={`completedGoal-${index}`}
                            className="h-6 w-6 rounded-2xl mr-4"
                            checked={checkedStates[index]}
                            onClick={() => handleCheckboxChange(index)}
                        />
                        <p>{goal.activity.title} <span className='font-bold text-primary'>{goal.meditationObject.title}</span></p>
                    </Card>
                ))}
            </div>

            {/* <div className="flex flex-col items-center justify-center w-full">
                {goals.slice(currentGoalIndex + 1).map((goal, index) => (
                    <Card key={index} className="w-full p-4 rounded-lg mb-4 text-gray-400 text-xl">
                        <p>{goal.activity.title} <span className='font-bold text-primary'>{goal.meditationObject.title}</span></p>
                    </Card>
                ))}
            </div> */}
        </div>
    );
};
