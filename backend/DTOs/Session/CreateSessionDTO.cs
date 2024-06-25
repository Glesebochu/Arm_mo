using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.ObservableObject;
using backend.DTOs.PreparationPhase;
using backend.Models;

namespace backend.DTOs.Session
{
    // DTO for creating a session
    public class CreateSessionDTO
    {
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public int MeditatorId { get; set; }
        public List<AhaMoment> AhaMoments { get; set; }
        public List<PracticedStage> PracticedStages { get; set; }
        public List<NewlyMasteredStage> NewlyMasteredStages { get; set; }
        public List<ObservableObjectDTO> ObservableObjects { get; set; }
        public int PreparationPhaseId { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}