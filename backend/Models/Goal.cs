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
        public Activity? Activity { get; set; }
        public ObservableObject? MeditationObject { get; set; }
        public DateOnly DueDate { get; set; }
        public DateOnly CompletedDate { get; set; }
        public Goal? ParentGoal { get; set; }
        public List<Goal>? ChildGoals { get; set; }

        public Goal() { }
        public Goal(Activity activity, ObservableObject meditationObject)
        {
            this.Activity = activity;
            this.MeditationObject = meditationObject;
        }

        // A function that sets the Status & CompletionDate of the parent goal when 
        // the last child goal is complete.

    }
}
