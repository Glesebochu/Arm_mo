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

        // { Read } {four paragraphs from a book}
        public DateOnly DueDate { get; set; }
        public DateOnly? CompletedDate { get; set; }
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
