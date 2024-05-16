namespace Arm_mo.Models
{
    public class NewlyMasteredStage
    {
        public int SessionId { get; set; }
        public Session Session { get; set; }

        public int StageId { get; set; }
        public Stage Stage { get; set; }
    }
}
