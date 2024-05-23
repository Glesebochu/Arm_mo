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
        public ActivityDTO? Activity { get; set; }
        public ObservableObjectDTO? MeditationObject { get; set; }
        // public CreateGoalDTO? ParentGoal { get; set; }
        public DateTime DueDateTime { get; set; }
        public DateTime CompletedDateTime { get; set; }
        public List<GoalDTO>? ChildGoals { get; set; }
    }
}