export class ObservableObjectType{
    static SensoryStimuls = "Sensory Stimulus";
    static MentalObject = "Mental Object";
}
export class ObservableObject{
    constructor(title, type, description, icon){
        this.Title = title;
        this.Type = type;
        this.Description = description;
        this.Icon = icon;
    }
}
