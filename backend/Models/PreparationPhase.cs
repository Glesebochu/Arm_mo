namespace backend.Models
{
    public class PreparationPhase
    {
        public int Id { get; set; }
        public TimeSpan Duration { get; set; }
        public Activity Activity { get; set; }
        public ObservableObject MeditationObject { get; set; }
        public string Motivation { get; set; }
        public Goal Goal { get; set; }
        public string Expectation { get; set; }
        public string Diligence { get; set; }
        public Hindrance[] Distractions { get; set; }
        public string Posture { get; set; }
    }

}