using static backend.Models.ObservableObject;

namespace backend.Models
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
    public enum Proximity
    {
        Unrelated,
        SameSubType,
        DirectlyRelated,
        MeditationObject
    }
    public class ObservableObject
    {
        public int Id { get; set; }
        public string Title { get; set; } = String.Empty;
        public string? Description { get; set; }
        public IntensityType? Intensity { get; set; }
        public ObservableObjectSubType SubType { get; set; }
        public Proximity ProximityToMO { get; set; }

        public ObservableObjectType Type()
        {
            if (
                SubType == ObservableObjectSubType.Visual ||
                SubType == ObservableObjectSubType.Auditory ||
                SubType == ObservableObjectSubType.Olfactory ||
                SubType == ObservableObjectSubType.Kinesthetic ||
                SubType == ObservableObjectSubType.Taste
            )
            {
                return ObservableObjectType.SensoryStimulus;
            }
            else
            {
                return ObservableObjectType.MentalObject;
            }
        }
    }
}
