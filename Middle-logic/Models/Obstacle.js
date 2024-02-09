export class Obstacle {
    constructor(id, description) {
        this.Obstacle_ID = id;
        this.Description = description;
    }

    static Resistance = "Resistance";
    static Procrastination = "Procrastination";
    static Fatigue = "Fatigue";
    static Impatience = "Impatience";
    static Boredom = "Boredom";
    static Motivation_Lack = "Lack of motivation";

    static Mind_Wandering = "Mind wandering";
    static Monkey_Mind = "Monkey mind";
    static Impatience = "Impatience";
    
    static Distractions = "Distractions";
    static Forgetting = "Forgetting";
    static Sleepiness = "Sleepiness";
    
    static convertArrayToObstacleObjects(array) {
        var obstacleObjects = array.map(obstacle => new Obstacle(obstacle.Obstacle_ID, obstacle.Description));
        return obstacleObjects;
      }
}