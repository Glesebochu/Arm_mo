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


export function ObservableObjectPopover({ observableObject, handleSave }) {
    // var observableObject = {
    //     title: "Four paragraphs from a book",
    //     description: "12 rules for life.",
    //     intensity: "Intense",
    //     subType: "Thought",
    //     proximityToMO: "MeditationObject",
    // }


    // For the select fields.
    const intensityOptions = ['Mild', 'Moderate', 'Intense'];
    const subTypeOptions = [
        'Visual',
        'Auditory',
        'Olfactory',
        'Kinesthetic',
        'Taste',
        '---',  // Divider
        'Thought',
        'MentalState',
        'FeelingTone'
    ];
    const proximityOptions = ['Unrelated', 'SameSubType', 'DirectlyRelated', 'MeditationObject'];


    const { title, description, intensity, subType, proximityToMO } = observableObject


    return (<>
        <Popover>

            <PopoverTrigger asChild>
                <Button variant="outline">{title}</Button>
            </PopoverTrigger>

            <PopoverContent>
                <div className="grid gap-2">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none text-muted-foreground">Observable Object</h4>
                        {/* <p className="text-sm text-muted-foreground">
                            Set the values for this object.
                        </p> */}
                    </div>

                    <hr key="divider" className="my-2 border-t-2" />

                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label className="text-muted-foreground" htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            defaultValue={title}
                            className="col-span-2 h-8 w-full resize-y"
                        />
                    </div>

                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label className="text-muted-foreground" htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            defaultValue={description}
                            className="col-span-2 h-8 w-full resize-y"
                        />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label className="text-muted-foreground" htmlFor="intensity">Intensity</Label>
                        <Select>
                            <SelectTrigger className="w-full col-span-2 h-8">
                                <SelectValue placeholder={intensity} />
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
                        <Select>
                            <SelectTrigger className="w-full col-span-2 h-8">
                                <SelectValue placeholder={subType} />
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
                        <Select>
                            <SelectTrigger className="w-full col-span-2 h-8">
                                <SelectValue placeholder={proximityToMO} />
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

                    <div className="grid grid-cols-3 items-center gap-4">
                        <Button className="w-full mt-4 p-2" variant="outline" onClick={handleSave}>
                            Save
                        </Button>
                    </div>

                </div>


            </PopoverContent>
        </Popover>

    </>)
}