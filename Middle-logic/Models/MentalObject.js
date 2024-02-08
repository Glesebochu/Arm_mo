import { ObservableObject, ObservableObjectType } from "./ObservableObject.js";

export class MentalObjectType{
    static Thought = "Thought";
    static FeelingTone = "Feeling Tone";
    static MentalState = "Mental State"
}
export class MentalObject extends ObservableObject{
    constructor(id, title, description, icon, mentalObjectType, intensity){
        super(id, title, ObservableObjectType.MentalObject, description, icon, intensity)
        this.Mental_Object_Type = mentalObjectType;
    }
    static getMentalObjectFromObject(obj){
        return new MentalObject(
            obj.Observable_Object_ID,
            obj.Title,
            obj.Discriminator,
            obj.Description,
            obj.Icon,
            obj.Mental_Object_Type,
            obj.Intensity
        );
    }
}