using System.Diagnostics;
using backend.Models;
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
        public Activity Activity { get; set; }
        public ObservableObject? MeditationObject { get; set; }
        public DateTime DueDateTime { get; set; }
        public DateTime CompletedDateTime { get; set; }
        public Goal? ParentGoal { get; set; }
        public List<Goal>? ChildGoals { get; set; }

        public Goal() { }
        public Goal(Activity activity, ObservableObject meditationObject)
        {
            this.Activity = activity;
            this.MeditationObject = meditationObject;
        }

    }
}