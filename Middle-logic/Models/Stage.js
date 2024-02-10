import { Intention } from "./Intention.js";
import { Obstacle } from "./Obstacle.js";
import { Skill } from "./Skill.js";

export class Stage {
    constructor(id, goal, intentions = [], obstacles = [], skills = [], masteryRequirements = [], isMastered = false) {
        this.Stage_ID = id;
        this.Goal = goal;
        this.Intentions = intentions;
        this.Obstacles = obstacles;
        this.Skills = skills;
        this.MasteryRequirements = masteryRequirements;
        this.Is_Mastered = isMastered;
    }
    static getStageFromObject(obj) {
        return new Stage(
            obj.Stage_ID,
            obj.Goal,
            Intention.getIntentionsFromArrayObjects(obj.Intentions),
            Obstacle.getObstaclesFromArrayObject(obj.Obstacles),
            Skill.getSkillsFromArrayObject(obj.Skills),
            obj.MasteryRequirements,
            obj.Is_Mastered
        );
    }
    static getStagesFromArrayObject(arr){
        var Stages= arr.map(Stage.getStageFromObject);
        return Stages;
    }

    static stageOne = new Stage(
        this.Stage_ID = 1,
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
        this.MasteryRequirements = [
            "I never miss a daily practice session.",
            "I do not procastinate while meditating."
        ]
    );

    // Stage 2
    static stageTwo = new Stage(
        this.Stage_ID = 2,
        this.Goal = "Shorten the periods of mind-wandering and extend the periods of sustained attention to the meditation object.",
        this.Intentions = [
            Intention.Appreciate_AhaMoment,
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
        this.MasteryRequirements = [
            "I can sustain attention on the meditation object for 10-15 minutes.",
            "Most periods of mind-wandering last only a few seconds."
        ]
    );

    // Stage 3
    static stageThree = new Stage(
        this.Stage_ID = 3,
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
        this.MasteryRequirements = [
            "I rarely forget the breath or fall asleep.",
        ]
    );
}