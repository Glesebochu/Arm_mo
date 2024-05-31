using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.Activity;
using backend.DTOs.ObservableObject;
using backend.Models;

namespace backend.DTOs.Goal
{
    public class GoalDTO
    {
        public string Status { get; set; } = String.Empty;
        public string Activity { get; set; } = String.Empty;
        public string MeditationObject { get; set; } = String.Empty;
        public DateTime DueDateTime { get; set; }
        // public DateTime CompletedDateTime { get; set; }
        //public GoalDTO? ParentGoal { get; set; }
        public List<GoalDTO>? ChildGoals { get; set; }
        public string GetTitle() => $"{Activity} {MeditationObject}";
    }
}