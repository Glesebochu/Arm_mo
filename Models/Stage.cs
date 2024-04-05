namespace Arm_mo.Models
{
    public class Stage
    {
        public int StageId { get; set; }
        public string Goal { get; set; }
        public List<string> Intentions { get; set; }
        public List<string> Obstacles { get; set; }
        public List<string> Skills { get; set; }
        public List<string> MasteryRequirements { get; set; }
        public bool IsMastered { get; set; }
    }
}
