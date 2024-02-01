export class Stage{
    constructor(number, goal, intentions=[], obstacles=[], skills=[], masteryRequirements=[]){
        this.Number = number;
        this.Goal = goal;
        this.Intentions = intentions;
        this.obstacles = obstacles;
        this.skills = skills;
        this.Mastery_Requirements = masteryRequirements;
        this.NextStage;
    }

    static createStages(){
        
    }
}