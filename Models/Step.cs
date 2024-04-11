namespace Arm_mo.Models
{
    public class Step
    {
        public enum StepType
        {
            Instruction,
            Question
        }
        public enum StepCategory
        {
            Prepartaion,
            Transition
        }
        public int ID { get; set; }
        public StepType Type { get; set; }
        public StepCategory Category { get; set; }
        public double Duration { get; set; }
        public String Response { get; set; }
        public Activity ? Activity { get; set; }

    }

}
