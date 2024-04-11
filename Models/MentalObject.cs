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
        public Enum Value { get; set; }
        public MentalObject(MentalObjectType mentalObjectType,Enum value)
        {
            this.mentalObjectType= mentalObjectType;
            this.Value = value;
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

        //Examples of how they may be used

        // Creating a mental object of type Thought
        MentalObject thought = MentalObject.CreateThought();

        // Creating a mental object of type FeelingTone
        MentalObject feelingTone = MentalObject.CreateFeelingTone(FeelingTone.Pleasant);

        // Creating a mental object of type MentalState
        MentalObject mentalState = MentalObject.CreateMentalState(MentalState.Clear);

    }
}
