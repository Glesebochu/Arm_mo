namespace Arm_mo.Models
{
    public class Session
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public Meditator Meditator { get; set; }
        public List<AhaMoment> ahaMoments { get; set; }
        public List<Stage> pracitcedStages { get; set; }

    }
}
