export class SensoryStimulusType{
    static Visual = "Visual";
    static Auditory = "Auditory";
    static Olfactory = "Olfactory";
    static Kinesthetic = "Kinesthetic";
    static Taste = "Taste";
}
export class SensoryStimulus{
    constructor(title, type, description, icon){
        this.Title = title;
        this.Type = type;
        this.Description = description;
        this.Icon = icon;
    }
}