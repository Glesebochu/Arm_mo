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
        this.SensoryStimulus_Type = sensoryStimulusType;
    }
    static getSensoryStimulusFromObject(obj){
        return new SensoryStimulus(
            obj.ObservableObject_ID,
            obj.Title,
            obj.Description,
            obj.Icon,
            obj.SensoryStimulus_Type,
            obj.Intensity
        );
    }
    static convertArrayToSensoryStimulusObjects(arr){
        var SensoryStimuli= arr.map(SensoryStimulus.getSensoryStimulusFromObject);
        return SensoryStimuli;
    }
}