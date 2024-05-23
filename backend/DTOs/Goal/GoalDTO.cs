using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.DTOs.Goal
{
    public class GoalDTO
    {
        public int Id { get; set; }
        public GoalStatus Status { get; set; }
        // public Models.Goal? ParentGoal { get; set; }
        public Models.Goal[]? ChildGoals { get; set; }
        public DateTime DueDateTime { get; set; }
        public DateTime CompletedDateTime { get; set; }
        public Activity? Activity { get; set; }
        public ObservableObject? MeditationObject { get; set; }
    }
}