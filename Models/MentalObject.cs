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
        public Enum ValueOfMentalObjectType { get; set; }
        //public MentalObject(MentalObjectType mentalObjectType,Enum ValueOfMentalObjectType)
        //{
        //    this.mentalObjectType= mentalObjectType;
        //    this.ValueOfMentalObjectType = ValueOfMentalObjectType;
        //}
        protected MentalObject(MentalObjects mentalObjectType,Enum valueOfMentalObjectType, String title, string description, string icon, IntensityType intensity) : base(title, description, icon, intensity)
        {
            this.MentalObjectType= mentalObjectType;
            this.ValueOfMentalObjectType = valueOfMentalObjectType;

        }

    }
}
