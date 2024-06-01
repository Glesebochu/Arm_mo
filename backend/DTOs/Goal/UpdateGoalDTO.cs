using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.DTOs.Goal
{
    public class UpdateGoalDTO
    {
        public GoalStatus Status { get; set; }
        public string Activity { get; set; } = String.Empty;
        public string MeditationObject { get; set; } = String.Empty;
        public DateOnly DueDate { get; set; }
        public DateOnly CompletedDate { get; set; }
    }
}