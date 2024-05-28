using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models{
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
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public string? Icon { get; set; }
        public IntensityType? Intensity { get; set; }
        public ObservableObjectSubType SubType { get; set; }

        // Nullable property of FeelingTone
        public FeelingTone? feelingTone { get; set; }
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


        public ObservableObject()
        {

        }

        public ObservableObject(string title, string description, string Icon,
        IntensityType intensity, ObservableObjectType type, ObservableObjectSubType subType,
        FeelingTone tone)
        {
            this.Title = title;
            this.Description = description;
            this.Icon = Icon;
            this.Intensity = intensity;
            this.SubType = subType;
            this.feelingTone = tone;
        }
    }

}