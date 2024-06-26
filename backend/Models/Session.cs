using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Session
    {
        public int Id { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }

        [Column("MeditatorID")]
        public Meditator Meditator { get; set; }
        public List<AhaMoment> AhaMoments { get; set; }
        public List<PracticedStage>? PracticedStages { get; set; }
        public List<NewlyMasteredStage>? NewlyMasterdStages { get; set; }
        public List<ObservableObject> ObservableObjects { get; set; }
        public PreparationPhase PreparationPhase { get; set; }
        public int PreparationPhaseId { get; set; } // Foreign key property
        public bool IsDeleted { get; set; } = false;
        public Session()
        {

        }
        public Session(DateTime startDateTime, DateTime endDateTime, Meditator meditator, List<AhaMoment> ahaMoments,
            List<PracticedStage> practicedStages, List<NewlyMasteredStage> newlyMasteredStages, List<ObservableObject> observableObjects)
        {
            StartDateTime = startDateTime;
            EndDateTime = endDateTime;
            Meditator = meditator;
            AhaMoments = ahaMoments;
            PracticedStages = practicedStages;
            ObservableObjects = observableObjects;
            NewlyMasterdStages = newlyMasteredStages;
        }

    }
}


