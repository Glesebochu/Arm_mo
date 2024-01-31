class Step{
    constructor(title, description, category, type){
        this.Title = title;
        this.Description = description;
        this.Category = category;
        this.Type = type;
    }
    
    static getDummySteps(){
        const Categories = {
            Preparation: "Preparation",
            Transition: "Transition"
        };
        const Types = {
            Instruction: "Instruction",
            Question: "Question"
        };

        var preparationSteps = [
            new Step(
                "Selection", 
                "Write down the activity you choose to do.", 
                Categories.Preparation, 
                Types.Question
            ),
            new Step(
                "Motivation",
                "Review your purpose for doing this activity. Don't judge your reasons. Be aware and accept them.", 
                Categories.Preparation, 
                Types.Question
            ),
            new Step(
                "Goal",
                "Decide on what you hope to work on in this session. Keep it simple and small.", 
                Categories.Preparation, 
                Types.Question
            ),
            new Step(
                "Expectations",
                "Remember the dangers of expecting unreasonably and too highly. Be gentle with yourself.", 
                Categories.Preparation, 
                Types.Instruction
            ),
            new Step(
                "Diligence",
                "Resolve to practice diligently for the entire session no matter how it goes. Write it down.", 
                Categories.Preparation, 
                Types.Question
            ),
            new Step(
                "Distractions",
                "Write down thoughts, emotions, ideas, plans, worries or any other distractions that may arise. Resolve to set them aside if they arise in the middle of the activity.", 
                Categories.Preparation, 
                Types.Question
            ),
            new Step(
                "Posture",
                "Make yourself as comfortable as possible.", 
                "", 
                Categories.Preparation, 
                Types.Instruction
            )
        ];

        var transitionSteps = [
            new Step(
                "Everything",
                "Take in all sensory stimuli as they occur in the present",
                Categories.Transition,
                Types.Instruction
            )
        ];

        return preparationSteps;
    }
}