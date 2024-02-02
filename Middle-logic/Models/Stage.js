import { Intention } from "./Intention.js";
import { Obstacle } from "./Obstacle.js";
import { Skill } from "./Skill.js";

export class Stage {
    constructor(number, goal, intentions = [], obstacles = [], skills = [], masteryRequirements = [], nextStage, isMastered=false) {
        this.Number = number;
        this.Goal = goal;
        this.Intentions = intentions;
        this.Obstacles = obstacles;
        this.Skills = skills;
        this.Mastery_Requirements = masteryRequirements;
        this.NextStage = nextStage;
        this.Is_Mastered = isMastered;
    }

    static stageOne = new Stage(
        this.Number = 1,
        this.Goal = "Develop a consistent daily meditation practice.",
        this.Intentions = [
            Intention.Sit_Down,
            Intention.Practice_Diligently
        ],
        this.Obstacles = [
            Obstacle.Resistance,
            Obstacle.Procrastination,
            Obstacle.Resistance,
            Obstacle.Procrastination,
            Obstacle.Fatigue,
            Obstacle.Impatience,
            Obstacle.Boredom,
            Obstacle.Motivation_Lack
        ],
        this.Skills = [
            Skill.Create_Practice_Routine,
            Skill.Set_Specific_Goal,
            Skill.Generate_Strong_Motivation,
            Skill.Cultivate_Discipline_Diligence
        ],
        this.Mastery_Requirements = [
            "I never miss a daily practice session.",
            "I do not procastinate while meditating."
        ]
    );

    static createStages() {
        var stages = [];
        // Stage 1
        var stageOne = new Stage();
        stageOne.Number = 1;
        stageOne.Goal = "Develop a consistent daily meditation practice.";
        stageOne.Intentions = [
            Intention.Sit_Down,
            Intention.Practice_Diligently
        ];
        stageOne.Obstacles = [
            Obstacle.Resistance,
            Obstacle.Procrastination,
            Obstacle.Resistance,
            Obstacle.Procrastination,
            Obstacle.Fatigue,
            Obstacle.Impatience,
            Obstacle.Boredom,
            Obstacle.Motivation_Lack
        ];
        stageOne.Skills = [
            Skill.Create_Practice_Routine,
            Skill.Set_Specific_Goal,
            Skill.Generate_Strong_Motivation,
            Skill.Cultivate_Discipline_Diligence
        ];
        stageOne.Mastery_Requirements = [
            "I never miss a daily practice session.",
            "I do not procastinate while meditating."
        ];
        stageOne.Is_Mastered = true;

        // Stage 2
        var stageTwo = new Stage();
        stageTwo.Number = 2;
        stageTwo.Goal = "Shorten the periods of mind-wandering and extend the periods of sustained attention to the meditation object.";
        stageTwo.Intentions = [
            Intention.Appreciate_Aha_Moment,
            Intention.Redirect_Attention,
            Intention.Engage_Breath_Maintain_Awareness
        ];
        stageTwo.Obstacles = [
            Obstacle.Mind_Wandering,
            Obstacle.Monkey_Mind,
            Obstacle.Impatience
        ];
        stageTwo.Skills = [
            Skill.Reinforce_Spontaneous_Introspective_Awareness,
            Skill.Sustain_Attention
        ];
        stageTwo.Mastery_Requirements = [
            "I can sustain attention on the meditation object for 10-15 minutes.",
            "Most periods of mind-wandering last only a few seconds."
        ];
        stageTwo.Is_Mastered = true;

        // Stage 3
        var stageThree = new Stage();
        stageThree.Number = 3;
        stageThree.Goal = "Overcome forgetting and falling asleep.";
        stageThree.Intentions = [
            Intention.Invoke_Introspective_Attention,
            Intention.Make_Corrections_Distractions,
            Intention.Engage_Breath_Maintain_Awareness
        ];
        stageThree.Obstacles = [
            Obstacle.Distractions,
            Obstacle.Mind_Wandering,
            Obstacle.Sleepiness,
            Obstacle.Forgetting
        ];
        stageThree.Skills = [
            Skill.Follow_Breath,
            Skill.Connect,
            Skill.Label,
            Skill.Check_In
        ];
        stageThree.Mastery_Requirements = [
            "I rarely forget the breath or fall asleep.",
        ];
        stageThree.Is_Mastered = true;

        stageOne.NextStage = stageTwo;
        stageTwo.NextStage = stageThree;

        stages.push(stageOne, stageTwo, stageThree);

        return stages;
    }
}