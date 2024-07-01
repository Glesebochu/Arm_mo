import React from 'react';
import { Card } from '../ui/card';

export function Step1Box({ meditationObjectType, onDone }) {

    const textReplacement = meditationObjectType == "MentalObject" ? "Mental Objects" : "Sensory Stimuli"

    return (
        <Card className="step-box w-full h-full flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg">

            <h3 className="text-2xl text-center m-10">
                Relax and be open to all <span className='text-primary font-semibold p-1'>{textReplacement}</span> in this moment.
                <br />
                Take in everything as objectively as possible - as it is.
            </h3>
        </Card>
    );
};

export default Step1Box;
