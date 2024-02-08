import { SensoryStimulus } from "./SensoryStimulus.js";
import { MentalObject } from "./MentalObject.js";

export class ObservableObjectType{
    static SensoryStimuls = "Sensory Stimulus";
    static MentalObject = "Mental Object";
}
export class ObservableObjectIntensity{
    static Mild = "Mild";
    static Moderate = "Moderate";
    static Intense = "Intense";
}
export class ObservableObject{
    constructor(id, title, type, description, icon, intensity){
        this.Observable_Object_ID = id;
        this.Title = title;
        this.Type = type;
        this.Description = description;
        this.Icon = icon;
        this.Intensity = intensity;
    }
    static getObservableObjectFromObject(obj){
        var observableObject;
        if (obj.Type == ObservableObjectType.MentalObject) {
            observableObject = new MentalObject();
            observableObject.Mental_Object_Type = obj.Mental_Object_Type;
        } else {
            observableObject = new SensoryStimulus();
            observableObject.Sensory_Stimulus_Type = obj.Sensory_Stimulus_Type;
        }

        observableObject.Observable_Object_ID = obj.Observable_Object_ID;
        observableObject.Title = obj.Title;
        observableObject.Type = obj.Type;
        observableObject.Description = obj.Description;
        observableObject.Icon = obj.Icon;
        observableObject.Intensity = obj.Intensity;

        return observableObject;
    }
}
