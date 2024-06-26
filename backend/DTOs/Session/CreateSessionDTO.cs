using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.AhaMoment;
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
        public List<CreateAhaMomentDTO> AhaMoments { get; set; }
        public List<int> PracticedStageIds { get; set; }
        public List<int> NewlyMasteredStageIds { get; set; }
        public List<CreateObservableObjectDTO> ObservableObjects { get; set; }
        public CreatePreparationPhaseDTO PreparationPhase { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}