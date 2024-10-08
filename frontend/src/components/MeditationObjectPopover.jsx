import React, { useState } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Textarea } from "@/components/ui/textarea"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { subTypeOptions } from '../../constants/constants';

export function MeditationObjectPopover({ observableObject, onSave, buttonClass }) {

    const [formState, setFormState] = useState({ ...observableObject });
    const [open, setOpen] = useState(false);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleSelectChange = (name, value) => {
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleSave = () => {
        onSave(formState);
        setOpen(false); // Close the popover on save
    };


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button className={buttonClass} variant="outline" onClick={() => setOpen(true)}>{formState.title}</Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="grid gap-2">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none text-muted-foreground">Meditation Object</h4>
                    </div>
                    <hr key="divider" className="my-2 border-t-2" />
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label className="text-muted-foreground" htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            name="title"
                            value={formState.title}
                            onChange={handleInputChange}
                            className="col-span-2 h-8 w-full resize-y"
                        />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label className="text-muted-foreground" htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formState.description}
                            onChange={handleInputChange}
                            className="col-span-2 h-8 w-full resize-y"
                        />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label className="text-muted-foreground" htmlFor="subType">SubType</Label>
                        <Select onValueChange={(value) => handleSelectChange('subType', value)}>
                            <SelectTrigger className="w-full col-span-2 h-8">
                                <SelectValue placeholder={formState.subType} />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                                {subTypeOptions.map(option => (
                                    option === '---'
                                        ? <hr key="divider" className="my-2 border-t-2" />
                                        : <SelectItem key={option} value={option}>
                                            {option}
                                        </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Button className="w-full mt-4 p-2" variant="outline" onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}