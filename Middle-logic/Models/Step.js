export class StepCategory{
    static Preparation = "Preparation";
    static Transition = "Transition";
}
export class StepType{
    static Instruction = "Instruction";
    static Question = "Question";
}

export class Step{
    constructor(Step_ID,Session_ID,title, description, category, type, duration=0, response=null, activity){
        this.Step_ID=Step_ID;
        this.Session_ID=Session_ID;
        this.Title = title;
        this.Description = description;
        this.Category = category;
        this.Type = type;
        this.Duration = duration;
        this.Response = response;
        this.Activity = activity;
    }

    static convertArrayToStepObjects(array) {
        var StepObjects = array.map(step => new Step(
            step.Step_ID,
            step.Session_ID,
            step.Title,
            step.Description,
            step.Category,
            step.Type,
            step.Duration,
            step.Response,
            step.Activity
        ));
        return StepObjects;
    }
    
    static getDummyPreparationSteps(){

        var preparationSteps = [
            new Step(
                undefined,
                "Activity", 
                "Write down the activity you choose to do.", 
                StepCategory.Preparation, 
                StepType.Question
            ),
            new Step(
                undefined,
                "Motivation",
                "Review your purpose for doing this activity. Don't judge your reasons. Be aware and accept them.", 
                StepCategory.Preparation, 
                StepType.Question
            ),
            new Step(
                undefined,
                "Goal",
                "Decide on what you hope to work on in this session. Keep it simple and small.", 
                StepCategory.Preparation, 
                StepType.Question
            ),
            new Step(
                undefined,
                "Expectations",
                "Remember the dangers of expecting unreasonably and too highly. Be gentle with yourself.", 
                StepCategory.Preparation, 
                StepType.Instruction
            ),
            new Step(
                undefined,
                "Diligence",
                "Resolve to practice diligently for the entire session no matter how it goes. Write it down.", 
                StepCategory.Preparation, 
                StepType.Question
            ),
            new Step(
                undefined,
                "Distractions",
                "Write down thoughts, emotions, ideas, plans, worries or any other distractions that may arise. Resolve to set them aside if they arise in the middle of the activity.", 
                StepCategory.Preparation, 
                StepType.Question
            ),
            new Step(
                undefined,
                "Posture",
                "Make yourself as comfortable as possible.", 
                StepCategory.Preparation, 
                StepType.Instruction
            )
        ];

    return preparationSteps;
  }
}
