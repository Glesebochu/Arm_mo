import { AhaMoment } from "./AhaMoment.js";
import { Meditator } from "./Meditator.js";
import { Stage } from "./Stage.js";
import { Step } from "./Step.js";

export class Session {
    constructor(Session_ID,meditator, startDateTime, endDateTime, practicedStages = [],  ahaMoments = [], steps = [],newlyMasteredStages = []) {
        this.Session_ID = Session_ID;
        this.Meditator = meditator;
        this.Start_Date_Time = startDateTime;
        this.End_Date_Time = endDateTime;
        this.Practiced_Stages = practicedStages;
        this.AhaMoments = ahaMoments;
        this.Steps = steps;
        this.Newly_Mastered_Stages = newlyMasteredStages;
    }
    static getSessionFromObject(obj){
        return new Session(
            obj.Session_ID,
            Meditator.getMeditatorFromObject(obj.Meditator),
            obj.Start_Date_Time,
            obj.End_Date_Time,
            Stage.getStagesFromArrayObject(obj.Practiced_Stages),
            AhaMoment.getAhaMomentsFromArrayObject(obj.AhaMoments),
            Step.getStepsFromArrayObject(obj.Steps),
            [],
        );
    }
    static getSessionsFromArrayObject(arr){
        return arr.map(this.getSessionFromObject);
    }

}