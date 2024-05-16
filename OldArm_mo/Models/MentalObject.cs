using System.Reflection;
using static Arm_mo.Models.SensoryStimulus;

namespace Arm_mo.Models
{
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
    public class MentalObject: ObservableObject
    {
        public enum MentalObjects
        {
            Thought,
            MentalState,
            FeelingTone
        }
        public MentalObjects MentalObjectType { get; set; }
        public FeelingTone? FeelingToneValue { get; set; }
        public MentalState? MentalStateValue { get; set; }
        public MentalObject(string title,string description,string icon, IntensityType intensity) 
            : base(title, description, icon, intensity)
        {   


        }
        //If the created object is a feeling tone
        protected MentalObject(MentalObjects mentalObjectType,FeelingTone valueOfMentalObjectType, String title, 
            string description, string icon, IntensityType intensity) : base(title, description, icon, intensity)
        {
            this.MentalObjectType= mentalObjectType;
            this.FeelingToneValue = valueOfMentalObjectType;

        }
        //If the created object is a mental state
        protected MentalObject(MentalObjects mentalObjectType, MentalState valueOfMentalObjectType, String title,
           string description, string icon, IntensityType intensity) : base(title, description, icon, intensity)
        {
            this.MentalObjectType = mentalObjectType;
            this.MentalStateValue = valueOfMentalObjectType;

        }

    }
}
