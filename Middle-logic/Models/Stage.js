import { Intention } from "./Intention.js";
import { Obstacle } from "./Obstacle.js";
import { Skill } from "./Skill.js";

export class Stage {
    constructor(number, goal, intentions = [], obstacles = [], skills = [], masteryRequirements = [], nextStage, isMastered = false) {
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
        ],
        this.NextStage = Stage.stageTwo
    );

    // Stage 2
    static stageTwo = new Stage(
        this.Number = 2,
        this.Goal = "Shorten the periods of mind-wandering and extend the periods of sustained attention to the meditation object.",
        this.Intentions = [
            Intention.Appreciate_Aha_Moment,
            Intention.Redirect_Attention,
            Intention.Engage_Breath_Maintain_Awareness
        ],
        this.Obstacles = [
            Obstacle.Mind_Wandering,
            Obstacle.Monkey_Mind,
            Obstacle.Impatience
        ],
        this.Skills = [
            Skill.Reinforce_Spontaneous_Introspective_Awareness,
            Skill.Sustain_Attention
        ],
        this.Mastery_Requirements = [
            "I can sustain attention on the meditation object for 10-15 minutes.",
            "Most periods of mind-wandering last only a few seconds."
        ],
        this.NextStage = Stage.stageThree
    );

    // Stage 3
    static stageThree = new Stage(
        this.Number = 3,
        this.Goal = "Overcome forgetting and falling asleep.",
        this.Intentions = [
            Intention.Invoke_Introspective_Attention,
            Intention.Make_Corrections_Distractions,
            Intention.Engage_Breath_Maintain_Awareness
        ],
        this.Obstacles = [
            Obstacle.Distractions,
            Obstacle.Mind_Wandering,
            Obstacle.Sleepiness,
            Obstacle.Forgetting
        ],
        this.Skills = [
            Skill.Follow_Breath,
            Skill.Connect,
            Skill.Label,
            Skill.Check_In
        ],
        this.Mastery_Requirements = [
            "I rarely forget the breath or fall asleep.",
        ]
    );
}