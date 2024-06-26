using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.Goal;
using backend.DTOs.Hindrance;

namespace backend.DTOs.PreparationPhase
{
    public class PreparationPhaseDTO
    {
        public int Id { get; set; }

        public List<GoalDTO>? Goals { get; set; }
        public TimeSpan Duration { get; set; }
        public string Motivation { get; set; } = String.Empty;
        public List<HindranceDTO> Distractions { get; set; }
        public string Expectation { get; set; } = String.Empty;
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }

    }
}