namespace Arm_mo.Models
{
    public class PracticedStage
    {
        public int SessionId { get; set; }
        public Session Session { get; set; }

        public int StageId { get; set; }
        public Stage Stage { get; set; }
    }
}
