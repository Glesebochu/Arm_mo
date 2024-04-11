namespace Arm_mo.Models
{
    public class Session
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public Meditator Meditator { get; set; }
        public List<AhaMoment> AhaMoments { get; set; }
        public List<Stage> PracitcedStages { get; set; }
        public List<Stage> NewlyMasterdStages {  get; set; }
        public List<ObservableObject> ObservableObjects { get; set; }

        public Session(DateTime startTime,DateTime endTime, Meditator meditator,List<AhaMoment> ahaMoments,
            List<Stage> practicedStages,List<Stage> newlyMasteredStages,List<ObservableObject> observableObjects)
        {
            StartTime = startTime;
            EndTime = endTime;
            Meditator = meditator;
            AhaMoments = ahaMoments;
            PracitcedStages = practicedStages;
            ObservableObjects = observableObjects;
            NewlyMasterdStages= newlyMasteredStages;
        }

    }
}
