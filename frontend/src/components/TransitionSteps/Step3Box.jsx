import React, { useState } from 'react';
import { Button } from '../ui/button';

export function Step3Box({ observableObjects, onDone, onAddObservableObject }) {
    const [selectedObjects, setSelectedObjects] = useState([]);

    const handleSelectObject = (object) => {
        setSelectedObjects([...selectedObjects, object]);
    };

    return (
        <div className="step-box w-full h-full flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg">
            <p className="text-lg text-gray-700 mb-4">
                Select or add observable objects directly related to the meditation object.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
                {observableObjects.map((object) => (
                    <button
                        key={object.id}
                        onClick={() => handleSelectObject(object)}
                        className={`px-4 py-2 rounded ${selectedObjects.includes(object) ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        {object.title}
                    </button>
                ))}
            </div>
            <Button onClick={onAddObservableObject} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                Add Observable Object
            </Button>
            <Button onClick={onDone} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                Done
            </Button>
        </div>
    );
};

export default Step3Box;
