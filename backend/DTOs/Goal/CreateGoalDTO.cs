using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.Activity;
using backend.DTOs.ObservableObject;
using backend.Models;

namespace backend.DTOs.Goal
{
    public class CreateGoalDTO
    {
        public GoalStatus Status { get; set; }
        public string Activity { get; set; } = String.Empty;
        public string MeditationObject { get; set; } = String.Empty;
        // public CreateGoalDTO? ParentGoal { get; set; }
        public DateOnly DueDate { get; set; }
        public List<CreateGoalDTO>? ChildGoals { get; set; }
    }
}