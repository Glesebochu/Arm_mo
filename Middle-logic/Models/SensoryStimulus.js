import { ObservableObject, ObservableObjectType } from "./ObservableObject.js";

export class SensoryStimulusType{
    static Visual = "Visual";
    static Auditory = "Auditory";
    static Olfactory = "Olfactory";
    static Kinesthetic = "Kinesthetic";
    static Taste = "Taste";
}
export class SensoryStimulus extends ObservableObject{
    constructor(id, title, description, icon, sensoryStimulusType, intensity){
        super(id, title, ObservableObjectType.SensoryStimuls, description, icon, intensity);
        this.Sensory_Stimulus_Type = sensoryStimulusType;
    }
    static getSensoryStimulusFromObject(obj){
        return new SensoryStimulus(
            obj.Observable_Object_ID,
            obj.Title,
            obj.Description,
            obj.Icon,
            obj.Sensory_Stimulus_Type,
            obj.Intensity
        );
    }
}