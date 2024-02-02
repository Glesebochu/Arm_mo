export class Session {
    constructor(meditator, activity, startDateTime, endDateTime, stageNumbers = [], ahaMoments = [], steps = []) {
        this.Meditator = meditator;
        this.Activity = activity;
        this.Start_Date_Time = startDateTime;
        this.End_Date_Time = endDateTime;
        this.Stage_Numbers = stageNumbers;
        this.Aha_Moments = ahaMoments;
        this.Steps = steps;
    }
}