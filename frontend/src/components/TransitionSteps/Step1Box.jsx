import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

export function Step1Box({ onDone }) {
    return (
        <Card className="step-box w-full h-full flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg">


            <p className="text-2xl text-gray-700">
                Be open to all observable objects in the present moment and relax.
            </p>


            {/* <Button onClick={onDone} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                Done
            </Button> */}
        </Card>
    );
};

export default Step1Box;
