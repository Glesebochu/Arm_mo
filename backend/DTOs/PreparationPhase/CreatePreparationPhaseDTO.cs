using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.Goal;
using backend.DTOs.Hindrance;
using backend.Models;

namespace backend.DTOs.PreparationPhase
{
    public class CreatePreparationPhaseDTO
    {
        public List<int> Goals { get; set; }
        public long Duration { get; set; }
        public string Motivation { get; set; } = String.Empty;
        public List<CreateHindranceDTO> Distractions { get; set; }
        public string Expectation { get; set; } = String.Empty;
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
    }
}