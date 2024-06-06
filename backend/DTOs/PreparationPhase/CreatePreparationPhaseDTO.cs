using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.Goal;
using backend.Models;

namespace backend.DTOs.PreparationPhase
{
    public class CreatePreparationPhaseDTO
    {
        public TimeSpan Duration { get; set; }
        public string Motivation { get; set; } = String.Empty;
        public List<CreateGoalDTO> Goals { get; set; }
        public string Expectation { get; set; } = String.Empty;
        public Hindrance[] Distractions { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
    }
}