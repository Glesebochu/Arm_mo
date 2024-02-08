export class Session {
    constructor(meditator, startDateTime, endDateTime, practicedStages = [], steps = [], ahaMoments = [], newlyMasteredStages = []) {
        this.Meditator = meditator;
        this.Start_Date_Time = startDateTime;
        this.End_Date_Time = endDateTime;
        this.Practiced_Stages = practicedStages;
        this.Aha_Moments = ahaMoments;
        this.Newly_Mastered_Stages = newlyMasteredStages;
        this.Steps = steps;
    }
    static convertArrayToSessionObjects(arr){
        var SessionObjects= arr.map(session=>
            new Session(session.Meditator_ID,session.Start_Time,session.End_Time,session.Practiced_Stages,session.Steps)
        )
        return SessionObjects;
    }

}