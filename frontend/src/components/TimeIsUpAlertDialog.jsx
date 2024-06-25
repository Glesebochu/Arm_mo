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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from './ui/input';
import { extend } from 'jquery';

export function TimeIsUpAlertDialog({ isOpen, setIsOpen, extendBy, onSessionEnd }) {

    const [extensionTime, setExtensionTime] = useState("");

    const closeDialog = () => {
        setIsOpen(false);
    };

    const handleExtend = () => {
        const extension = parseInt(extensionTime, 10);
        if (!isNaN(extension)) {
            extendBy(extension);
        }
        closeDialog();
    };

    const handleEnd = () => {
        onSessionEnd();
        closeDialog();
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Time is Up</AlertDialogTitle>
                    <AlertDialogDescription>
                        The time you dedicated for this meditation is over. Do you want to
                        continue or end the meditation right here?
                        <Input
                            value={extensionTime}
                            onChange={(e) => setExtensionTime(e.target.value)}
                            placeholder="10 mins"
                            className="w-full mt-4"
                        />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleEnd}>
                        End
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleExtend}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
