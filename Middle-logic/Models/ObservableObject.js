// import { SensoryStimulus } from "./SensoryStimulus.js";
// import { MentalObject } from "./MentalObject.js";

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
    constructor(id, title, discriminator, description, icon, intensity){
        this.Observable_Object_ID = id;
        this.Title = title;
        this.Discriminator = discriminator;
        this.Description = description;
        this.Icon = icon;
        this.Intensity = intensity;
    }
    static async getObservableObjectFromObject(obj){
        var observableObject;
        if (obj.Type == ObservableObjectType.MentalObject) {
            const {MentalObject} = await import('./MentalObject.js');
            observableObject = new MentalObject();
            observableObject.Mental_Object_Type = obj.Mental_Object_Type;
        } else {
            const {SensoryStimulus} = await import('./SensoryStimulus.js');
            observableObject = new SensoryStimulus();
            observableObject.Sensory_Stimulus_Type = obj.Sensory_Stimulus_Type;
        }

        observableObject.Observable_Object_ID = obj.Observable_Object_ID;
        observableObject.Title = obj.Title;
        observableObject.Discriminator = obj.Discriminator;
        observableObject.Description = obj.Description;
        observableObject.Icon = obj.Icon;
        observableObject.Intensity = obj.Intensity;

        return observableObject;
    }
}
