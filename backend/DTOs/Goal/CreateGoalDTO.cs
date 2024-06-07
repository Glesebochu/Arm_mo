using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.ObservableObject;
using backend.Models;

namespace backend.DTOs.Goal
{
    public class CreateGoalDTO
    {
        public GoalStatus Status { get; set; }
        public string Activity { get; set; } = String.Empty;
        public MeditationObjectDTO? MeditationObject { get; set; }
        public DateOnly DueDate { get; set; }
        public DateOnly? CompletedDate { get; set; }
        public int? ParentGoalId { get; set; }
        public List<CreateGoalDTO>? ChildGoals { get; set; }
    }
}