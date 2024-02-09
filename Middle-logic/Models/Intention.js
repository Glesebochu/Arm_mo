export class Intention {
    constructor(Intention_ID,description) {
        this.Intention_ID = Intention_ID
        this.Description = description;
    }
    static Sit_Down = "Sit down and meditate for a set period every day.";
    static Practice_Diligently = "Practice diligently for the duration of the sit.";
    
    static Appreciate_AhaMoment = "Appreciate the aha moment that recognizes mind-wandering.";
    static Redirect_Attention = "Gently but firmly redirect attention back to the breath.";
    static Engage_Breath_Maintain_Awareness = "Engage with the breath as fully as possible without losing peripheral awareness.";
    
    static Invoke_Introspective_Attention = "Invoke introspective attention frequently, before you've forgotten the breath or fallen asleep.";
    static Make_Corrections_Distractions = "Make corrections as soon as you notice distractions or dullness.";

    static getIntentionFromArray(arr) {
        const IntentionArray = arr.map(obj =>
            new Intention(obj.Intention_ID, obj.Description)
        );
        return IntentionArray;
    }
}