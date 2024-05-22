namespace Arm_mo.Models
{
    public class Session
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public Meditator Meditator { get; set; }
        public List<AhaMoment> AhaMoments { get; set; }
        public List<PracticedStage> PracticedStages { get; set; }
        public List<NewlyMasteredStage> NewlyMasterdStages {  get; set; }
        public List<ObservableObject> ObservableObjects { get; set; }

        public Session()
        {

        }
        public Session(DateTime startTime,DateTime endTime, Meditator meditator,List<AhaMoment> ahaMoments,
            List<PracticedStage> practicedStages,List<NewlyMasteredStage> newlyMasteredStages,List<ObservableObject> observableObjects)
        {
            StartTime = startTime;
            EndTime = endTime;
            Meditator = meditator;
            AhaMoments = ahaMoments;
            PracticedStages = practicedStages;
            ObservableObjects = observableObjects;
            NewlyMasterdStages= newlyMasteredStages;
        }

    }
}
