import { ObservableObject, ObservableObjectType } from "./ObservableObject.js";

export class MentalObjectType{
    static Thought = "Thought";
    static FeelingTone = "Feeling Tone";
    static MentalState = "Mental State"
}
export class MentalObject extends ObservableObject{
    constructor(id, title, description, icon, mentalObjectType, intensity){
        super(id, title, ObservableObjectType.MentalObject, description, icon, intensity)
        this.MentalObject_Type = mentalObjectType;
    }
    static getMentalObjectFromObject(obj){
        return new MentalObject(
            obj.ObservableObject_ID,
            obj.Title,
            obj.Description,
            obj.Icon,
            obj.MentalObject_Type,
            obj.Intensity
        );
    }
    static convertArrayToMentalObjectObjects(arr){
        var MentalObjects= arr.map(this.getMentalObjectFromObject);
        return MentalObjects;
    }
    static getMentalObjectsFromArray(arr) {
        const MentalObjectArray = arr.map(obj =>
            new MentalObject(obj.ObservableObject_ID,
                obj.Title,
                obj.Description,
                obj.Icon,
                obj.MentalObject_Type,
                obj.Intensity)
        );
        return MentalObjectArray;
    }
}