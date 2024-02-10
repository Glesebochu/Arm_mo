// import { SensoryStimulus, SensoryStimulusType } from "./SensoryStimulus.js";

export class Activity{
    constructor(id, title, meditationObject){
        this.Activity_ID = id;
        this.Title = title;
        this.MeditationObject = meditationObject;
    }

    // static Breathing = new Activity(
    //     undefined, 
    //     "Breathing",
    //     new SensoryStimulus(undefined, "Breath at the nose.", "Breathing sensations at the nose", "icon", SensoryStimulusType.Kinesthetic)
    // );
    // static Reading = new Activity(
    //     undefined,
    //     "Reading",
    //     new SensoryStimulus(undefined, "The current sentence.", "The sentence you are currently reading.", "icon", SensoryStimulusType.Visual)
    // );
    // static Talking = new Activity(
    //     undefined,
    //     "Talking",
    //     new SensoryStimulus(undefined, "The current sentence.", "The sentence you are currently reading.", "icon", SensoryStimulusType.Auditory)
    // );
    // static getAllActivities(){
    //     return [Activity.Breathing, Activity.Reading, Activity.Talking];
    // }

    static getActivityFromObject(obj){
        return new Activity(
            obj.Activity_ID,
            obj.Title,
            obj.MeditationObject
        );
    }

    static getActivitiesFromArrayObject(arr){
        var Activities= arr.map(Activity.getActivityFromObject);
        return Activities;
    }
}