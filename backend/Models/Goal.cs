using System.Diagnostics;

namespace backend.Models
{
    public enum GoalStatus
    {
        NotStarted,
        InProgress,
        Completed
    }

    public class Goal
    {
        public int Id { get; set; }
        public GoalStatus Status { get; set; }
        public Goal? ParentGoal { get; set; }
        public Goal[]? ChildGoals { get; set; }
        public DateTime DueDateTime { get; set; }
        public DateTime CompletedDateTime { get; set; }
        public Activity Activity { get; set; }
        public ObservableObject MeditationObject { get; set; }

        public Goal(Activity activity, ObservableObject meditationObject){
            this.Activity = activity;
            this.MeditationObject = meditationObject;
        }

        // A function that sets the Status & CompletionDateTime of the parent goal when 
        // the last child goal is complete.

    }
}
