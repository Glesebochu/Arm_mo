namespace backend.Models{
    public class TransitionPhase
    {
        public int RegisteredStimuliCount { get; set; }
        public TimeSpan Duration { get; set; }
        public string SameTypeObservableObject { get; set; }
        public string DirectlyRelatedObservableObject { get; set; }
        public TimeSpan DistractionDuration { get; set; }
    }

}
