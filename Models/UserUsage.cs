namespace Arm_mo.Models
{
    public class UserUsage
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; }
        public DateTime StartTime { get; set; } 
        public TimeSpan UsageTime { get; set; }

        public Meditator User { get; set; }
    }
}
