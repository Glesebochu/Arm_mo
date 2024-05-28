namespace backend.Models
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
        public Step()
        {

        }
        public Step(StepType type, double duration,StepCategory stepCategory,String response)
        {
            this.Type = type;
            this.Duration = duration;
            this.Category= stepCategory;
            this.Response = response;
        }
        public Step(StepType type, double duration, StepCategory stepCategory, String response,Activity activity)
        {
            this.Type = type;
            this.Duration = duration;
            this.Category = stepCategory;
            this.Response = response;
            this.Activity= activity;
        }

    }

}
