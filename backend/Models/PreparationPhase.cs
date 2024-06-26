namespace backend.Models
{
    public class PreparationPhase
    {
        public int Id { get; set; }
        public List<Goal>? Goals { get; set; }
        public TimeSpan Duration { get; set; }
        public string Motivation { get; set; } = String.Empty;
        public List<Hindrance> Distractions { get; set; }
        public string Expectation { get; set; } = String.Empty;
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public PreparationPhase() { }
    }

}