export class Session {
    constructor(meditator, startDateTime, endDateTime, practicedStages = [], ahaMoments = [], steps = [], newlyMasteredStages = []) {
        this.Meditator = meditator;
        this.Start_Date_Time = startDateTime;
        this.End_Date_Time = endDateTime;
        this.Practiced_Stages = practicedStages;
        this.Aha_Moments = ahaMoments;
        this.Newly_Mastered_Stages = newlyMasteredStages;
        this.Steps = steps;
    }

}