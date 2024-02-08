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
    static getMentalObjectFromObject(obj){
        return new MentalObject(
            obj.Observable_Object_ID,
            obj.Title,
            obj.Type,
            obj.Description,
            obj.Icon,
            obj.Mental_Object_Type,
            obj.Intensity
        );
    }
    static getSensoryStimulusFromObject(obj){
        return new SensoryStimulus(
            obj.Observable_Object_ID,
            obj.Title,
            obj.Type,
            obj.Description,
            obj.Icon,
            obj.Sensory_Stimulus_Type,
            obj.Intensity
        );
    }
}
