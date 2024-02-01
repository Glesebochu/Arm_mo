class StepCategory {
  static Preparation = "Preparation";
  static Transition = "Transition";
}
class StepType {
  static Instruction = "Instruction";
  static Question = "Question";
}

class Step {
  constructor(title, description, category, type, startTime = 0, endTime = 0) {
    this.Title = title;
    this.Description = description;
    this.Category = category;
    this.Type = type;
    this.Start_Time = startTime;
    this.End_Time = endTime;
  }

  static getDummyPreparationSteps() {
    var preparationSteps = [
      new Step(
        "Selection",
        "Write down the activity you choose to do.",
        StepCategory.Preparation,
        StepType.Question
      ),
      new Step(
        "Motivation",
        "Review your purpose for doing this activity. Don't judge your reasons. Be aware and accept them.",
        StepCategory.Preparation,
        StepType.Question
      ),
      new Step(
        "Goal",
        "Decide on what you hope to work on in this session. Keep it simple and small.",
        StepCategory.Preparation,
        StepType.Question
      ),
      new Step(
        "Expectations",
        "Remember the dangers of expecting unreasonably and too highly. Be gentle with yourself.",
        StepCategory.Preparation,
        StepType.Instruction
      ),
      new Step(
        "Diligence",
        "Resolve to practice diligently for the entire session no matter how it goes. Write it down.",
        StepCategory.Preparation,
        StepType.Question
      ),
      new Step(
        "Distractions",
        "Write down thoughts, emotions, ideas, plans, worries or any other distractions that may arise. Resolve to set them aside if they arise in the middle of the activity.",
        StepCategory.Preparation,
        StepType.Question
      ),
      new Step(
        "Posture",
        "Make yourself as comfortable as possible.",
        "",
        StepCategory.Preparation,
        StepType.Instruction
      ),
    ];

    return preparationSteps;
  }
}
var current = 0;
document.getElementById().addEventListener("click", () => {
  current++;
});
document.getElementById().addEventListener("click", () => {
  if ((step.preparationSteps[current][0] = Step.preparationSteps[0][0]))
    var startTime = time();
  else if ((step.transitionSteps[current][0] = Step.transitionSteps[0][0]))
    var prepDuration = timer.value;
});

document.getElementById().addEventListener(click, () => {
  var endTime = timer.value;
});
function getTotalTime() {
  totalDuration = endTime - startTime;
}
