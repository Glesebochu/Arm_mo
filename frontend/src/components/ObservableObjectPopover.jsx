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

//Icons
import { Eye, Ear, Thermometer } from "lucide-react"
import { GiTongue, GiNoseFront, GiBrain, GiHearts } from 'react-icons/gi'
import { IoHandRightOutline } from "react-icons/io5";

import { subTypeOptions, intensityOptions, proximityOptions } from '../../constants/constants';

export function ObservableObjectPopover({ observableObject, onSave, onDelete, buttonClass }) {
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

    const handleDelete = () => {
        onDelete(observableObject);
        setOpen(false); // Close the popover on delete
    };

    const getProperIcon = () => {
        switch (formState.subType) {
            case "Visual":
                return <Eye className="mr-2" />
            case "Auditory":
                return <Ear className="mr-2" />
            case "Olfactory":
                return <GiNoseFront className="mr-2" />
            case "Kinesthetic":
                return <IoHandRightOutline className="mr-2" />
            case "Taste":
                return <GiTongue className="mr-2" />
            case "MentalState":
                return <GiHearts className="mr-2" />
            case "Thought":
                return <GiBrain className="mr-2" />
            case "FeelingTone":
                return <Thermometer className="mr-2" />
            default:
                return <Eye className="mr-2" />
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button className={buttonClass} variant="outline" onClick={() => setOpen(true)}>
                    {getProperIcon()}
                    {formState.title}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="grid gap-2">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none text-muted-foreground">Observable Object</h4>
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
                        <Label className="text-muted-foreground" htmlFor="intensity">Intensity</Label>
                        <Select onValueChange={(value) => handleSelectChange('intensity', value)}>
                            <SelectTrigger className="w-full col-span-2 h-8">
                                <SelectValue placeholder={formState.intensity} />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                                {intensityOptions.map(option => (
                                    <SelectItem key={option} value={option}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
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
                        <Label className="text-muted-foreground" htmlFor="proximityToMO">Proximity to MO</Label>
                        <Select onValueChange={(value) => handleSelectChange('proximityToMO', value)}>
                            <SelectTrigger className="w-full col-span-2 h-8">
                                <SelectValue placeholder={formState.proximityToMO} />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                                {proximityOptions.map(option => (
                                    <SelectItem key={option} value={option}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <Button className="w-full p-2" variant="outline" onClick={handleSave}>
                            Save
                        </Button>
                        <Button className="w-full p-2" variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </div>


                </div>
            </PopoverContent>
        </Popover>
    );
}

