import React, { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from './ui/button';

export function AhaMomentAlertDialog({ isOpen, setIsOpen, addAhaMoment }) {
    const [ahaMoment, setAhaMoment] = useState('');

    const handleAddAhaMoment = () => {
        addAhaMoment(ahaMoment);
        setIsOpen(false);
        setAhaMoment('');
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button className="w-full h-10" variant="outline">Add Aha</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Add Aha Moment</AlertDialogTitle>
                    <AlertDialogDescription>
                        Give your aha moment a simple label.
                        <Input
                            value={ahaMoment}
                            onChange={(e) => setAhaMoment(e.target.value)}
                            placeholder="Remembering or Fantacizing..."
                            className="w-full mt-4"
                        />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsOpen(false)}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleAddAhaMoment}>
                        Add
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
