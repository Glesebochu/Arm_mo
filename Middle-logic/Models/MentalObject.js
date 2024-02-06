import { ObservableObject, ObservableObjectType } from "./ObservableObject";

export class MentalObjectType{
    static Thought = "Thought";
    static FeelingTone = "Feeling Tone";
    static MentalState = "Mental State"
}
export class MentalObject extends ObservableObject{
    constructor(id, title, description, icon, mentalObjectType){
        super(id, title, ObservableObjectType.MentalObject, description, icon)
        this.Mental_Object_Type = mentalObjectType;
    }
}