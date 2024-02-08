import { SensoryStimulus, SensoryStimulusType } from "./SensoryStimulus.js";

export class Activity{
    constructor(id, title, meditationObject){
        this.Activity_ID = id;
        this.Title = title;
        this.Meditation_Object = meditationObject;
    }

    static Breathing = new Activity(
        1, 
        "Breathing",
        new SensoryStimulus(1, "Breath at the nose.", "Breathing sensations at the nose", "icon", SensoryStimulusType.Kinesthetic)
    );
    static Reading = new Activity(
        2,
        "Reading",
        new SensoryStimulus(2, "The current sentence.", "The sentence you are currently reading.", "icon", SensoryStimulusType.Visual)
    );
    static Talking = new Activity(
        3,
        "Talking",
        new SensoryStimulus(3, "The current sentence.", "The sentence you are currently reading.", "icon", SensoryStimulusType.Auditory)
    );
    static getAllActivities(){
        return [Activity.Breathing, Activity.Reading, Activity.Talking];
    }

    static getActivityFromObject(obj){
        return new Activity(
            obj.Activity_ID,
            obj.Title,
            obj.Meditation_Object
        );
    }
}