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
}
