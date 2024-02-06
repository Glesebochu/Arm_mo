export class Activity{
    constructor(id, title, meditationObject){
        this.Id = id;
        this.Title = title;
        this.Meditation_Object = meditationObject;
    }

    static Breathing = new Activity(
        1, 
        "Breathing",
        "Breath sensations at the nose."
    )
    static Reading = new Activity(
        2,
        "Reading",
        "The current sentence."
    )
    static Talking = new Activity(
        3,
        "Talking",
        "The current sentence."
    )
    static getAllActivities(){
        return [Activity.Breathing, Activity.Reading, Activity.Talking];
    }
}