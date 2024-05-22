public class ObservableObject
{
    public enum ObservableObjectType
    {
        MentalObject,
        SensoryStimulus
    }

    public enum ObservableObjectSubType
    {
        Visual,
        Auditory,
        Olfactory,
        Kinesthetic,
        Taste,
        
        Thought,
        MentalState,
        FeelingTone
    }

    public enum IntensityType
    {
        Mild,
        Moderate,
        Intense
    }
    
    public enum FeelingTone
    {
        Pleasant,
        Unpleasant,
        Neutral
    }

    public enum MentalState
    {
        Clear,
        Dull,
        Agitated
    } 
    
    public int Id { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public string? Icon { get; set; }
    public IntensityType? Intensity { get; set; }
    public ObservableObjectType Type { get; set; }
    public ObservableObjectSubType SubType { get; set; }

    // Nullable properties for MentalState and FeelingTone
    public MentalState? mentalState { get; set; }
    public FeelingTone? feelingTone { get; set; }

    public ObservableObject(string title,string description,string Icon, 
    IntensityType intensity,ObservableObjectType type,ObservableObjectSubType subType,
    FeelingTone tone, MentalState state){
        this.Title=title;
        this.Description=description;
        this.Icon= Icon;
        this.Intensity=intensity;
        this.Type= type;
        this.SubType=subType;
        this.feelingTone=tone;
        this.mentalState=mentalState;

    }
}

