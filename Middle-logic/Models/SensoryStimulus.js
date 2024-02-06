import { ObservableObject, ObservableObjectType } from "./ObservableObject";

export class SensoryStimulusType extends ObservableObject{
    static Visual = "Visual";
    static Auditory = "Auditory";
    static Olfactory = "Olfactory";
    static Kinesthetic = "Kinesthetic";
    static Taste = "Taste";
}
export class SensoryStimulus{
    constructor(id, title, description, icon, sensoryStimulusType){
        super(id, title, ObservableObjectType.SensoryStimuls, description, icon);
        this.Sensory_Stimulus_Type = sensoryStimulusType;
    }
}