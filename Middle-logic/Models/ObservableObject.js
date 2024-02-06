export class ObservableObjectType{
    static SensoryStimuls = "Sensory Stimulus";
    static MentalObject = "Mental Object";
}
export class ObservableObject{
    constructor(id, title, type, description, icon){
        this.Id = id;
        this.Title = title;
        this.Type = type;
        this.Description = description;
        this.Icon = icon;
    }
}
