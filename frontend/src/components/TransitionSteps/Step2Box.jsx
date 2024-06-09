import React from 'react';
import { Button } from '../ui/button';

export function Step2Box({ onDone }) {
  return (
    <div className="step-box w-full h-full flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg">
      <p className="text-lg text-gray-700 mb-4">
        Tune into and range freely among the observable objects of the same type as the meditation object.
      </p>
      <ul className="text-gray-600 list-disc list-inside mb-4">
        <li>Visual</li>
        <li>Auditory</li>
        <li>Gustatory</li>
        <li>Olfactory</li>
        <li>Bodily</li>
        <li>Thought</li>
        <li>Mental State (Emotion)</li>
        <li>Feeling State</li>
      </ul>
      <Button onClick={onDone} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
        Done
      </Button>
    </div>
  );
};

export default Step2Box;
