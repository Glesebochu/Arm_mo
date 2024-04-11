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
        public enum MentalObjectType
        {
            Thought,
            MentalState,
            FeelingTone
        }
        public MentalObjectType mentalObjectType { get; set; }
        public Enum value { get; set; }
        public MentalObject(MentalObjectType mentalObjectType,Enum value)
        {
            this.mentalObjectType= mentalObjectType;
            this.value = value;
        }
        public static MentalObject CreateThought()
        {
            return new MentalObject(MentalObjectType.Thought,null);
        }

        public static MentalObject CreateFeelingTone(FeelingTone tone)
        {
            return new MentalObject(MentalObjectType.FeelingTone,tone);
        }

        public static MentalObject CreateMentalState(MentalState mentalState)
        {
            return new MentalObject(MentalObjectType.MentalState,mentalState);
        }

    }
}
