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

        // A function that sets the Status & CompletionDateTime of the parent goal when 
        // the last child goal is complete.

        /* ARCHIVE
		// Option 1
		public string Verb { get; set; }
		public string Target { get; set; }
		public string ContextOrCondition { get; set; }
		
		// Option 2
		public string Verb { get; set; }
		public string NounPhrase { get; set; }
		*/
    }
}
