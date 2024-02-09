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
            obj.Meditator,
            obj.Start_Date_Time,
            obj.End_Date_Time,
            obj.Practiced_Stages,
            obj.AhaMoments,
            obj.Steps,
            [],
        );
    }
    static convertArrayToSessionObjects(arr){
        var SessionObjects= arr.map(session=>
            new Session(session.Session_ID,session.Meditator,session.Start_Date_Time,session.End_Date_Time,session.Practiced_Stages,session.AhaMoments,session.Steps)
        )
        return SessionObjects;
    }

}