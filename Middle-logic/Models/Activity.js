import { SensoryStimulus, SensoryStimulusType } from "./SensoryStimulus.js";

export class Activity{
    constructor(id, title, meditationObject){
        this.ID = id;
        this.Title = title;
        this.Meditation_Object = meditationObject;
    }

    static Breathing = new Activity(
        1, 
        "Breathing",
        new SensoryStimulus(1, "Breath at the nose", "Breathing sensations at the nose", "icon", SensoryStimulusType.Kinesthetic)
    );
    static Reading = new Activity(
        2,
        "Reading",
        "The current sentence."
    );
    static Talking = new Activity(
        3,
        "Talking",
        "The current sentence."
    );
    static getAllActivities(){
        return [Activity.Breathing, Activity.Reading, Activity.Talking];
    }
}