export class ObservableObjectType{
    static SensoryStimuls = "SensoryStimulus";
    static MentalObject = "MentalObject";
}
export class ObservableObjectIntensity{
    static Mild = "Mild";
    static Moderate = "Moderate";
    static Intense = "Intense";
}
export class ObservableObject{
    constructor(id, title, discriminator, description, icon, intensity){
        this.Observable_Object_ID = id;
        this.Title = title;
        this.Discriminator = discriminator;
        this.Description = description;
        this.Icon = icon;
        this.Intensity = intensity;
    }
    
}
