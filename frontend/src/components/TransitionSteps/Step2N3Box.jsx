import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ObservableObjectPopover } from '../ObservableObjectPopover';

export function Step2N3Box({ stepNo, meditationObject, initialObjects, setCurrentObservableObjects }) {
	const [observableObjects, setObservableObjects] = useState(initialObjects || []);

	useEffect(() => {
		setCurrentObservableObjects(observableObjects);
	}, [observableObjects]);

	const { title, subType } = meditationObject;

	function instruction() {
		switch (stepNo) {
			case 2:
				return (
					<h3 className="row-start-1 col-start-1 col-span-7 row-span-2 text-2xl justify-self self-center text-center m-4">
						Limit the scope of your attention to
						<span className='text-primary font-bold p-1'>{textReplacement(subType)}</span>.
						<br />
						Keep your peripheral awareness open and alert.
					</h3>
				)
			case 3:
				return (
					<h3 className="row-start-1 col-start-1 col-span-7 row-span-2 text-2xl justify-self self-center text-center m-4">
						Limit the scope of your attention to {textReplacement(subType)}
						<br />
						<span className='text-primary font-bold p-1'>directly related to {title}</span>.

					</h3>
				)
		}
	}

	function textReplacement(subType) {
		switch (subType) {
			case 'Visual':
				return 'all Visual Stimuli';
			case 'Auditory':
				return 'all Auditory Stimuli';
			case 'Olfactory':
				return 'all Olfactory Stimuli';
			case 'Kinesthetic':
				return 'all Kinesthetic Stimuli';
			case 'Taste':
				return 'all Taste Stimuli';
			case 'Thought':
				return 'all Thoughts';
			case 'MentalState':
				return 'all Mental States';
			case 'FeelingTone':
				return 'the Feeling Tone';
			default:
				return 'Unknown subtype';
		}
	}

	const handleAddObservableObject = () => {
		setObservableObjects(
			[...observableObjects,
			{
				id: observableObjects.length + 1,
				title: `Object ${observableObjects.length + 1}`,
				subType: subType,
				intensity: 'Moderate',
				proximityToMO: stepNo == 2 ? 'SameSubType' : 'DirectlyRelated'
			}
			]);
	};

	const handleSave = (updatedObject) => {
		setObservableObjects(observableObjects.map(obj => obj.id === updatedObject.id ? updatedObject : obj));
	};

	const handleDelete = (deletedObject) => {
		setObservableObjects(observableObjects.filter(obj => obj.id !== deletedObject.id));
	};

	return (
		<Card className="step-box grid grid-cols-7 grid-rows-8 h-full w-full p-5 gap-6">

			{instruction()}

			<div
				className="
					observable-object-container
					row-start-3 row-span-5 col-start-1 col-span-7

					flex flex-wrap gap-3 justify-start items-start
					overflow-y-auto
					no-scrollbar
				"
			>
				{observableObjects.map((observableObject) => (
					<ObservableObjectPopover
						key={observableObject.id}
						observableObject={observableObject}
						onSave={handleSave}
						onDelete={handleDelete}
					/>
				))}
			</div>

			<Button
				onClick={handleAddObservableObject}
				className="row-start-8 col-start-1 col-span-7 self-center"
			>
				Add
			</Button>
		</Card>
	);
}