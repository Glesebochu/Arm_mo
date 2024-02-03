export class Session {
    constructor(meditator, activity, startDateTime, endDateTime, practicedStages = [], ahaMoments = [], steps = [], newlyMasteredStages) {
        this.Meditator = meditator;
        this.Activity = activity;
        this.Start_Date_Time = startDateTime;
        this.End_Date_Time = endDateTime;
        this.Practiced_Stages = practicedStages;
        this.Aha_Moments = ahaMoments;
        this.Steps = steps;
        this.Newly_Mastered_Stages = newlyMasteredStages;
    }
}