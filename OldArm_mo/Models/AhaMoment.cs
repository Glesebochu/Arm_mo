namespace Arm_mo.Models
{
    public class AhaMoment
    {
        public int Id { get; set; }
        public String Label { get; set; }
        public AhaMoment(String label)
        {
            this.Label = label;
        }
    }
}
