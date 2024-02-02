export class Session {
    constructor(meditator, activity, startDateTime, endDateTime, stageNumbers = [], endingStageNo, ahaMoments = [], steps = [], masteredStage) {
        this.Meditator = meditator;
        this.Activity = activity;
        this.Start_Date_Time = startDateTime;
        this.End_Date_Time = endDateTime;
        this.Stage_Numbers = stageNumbers;
        this.Ending_Stage_No = endingStageNo;
        this.Aha_Moments = ahaMoments;
        this.Steps = steps;
        this.Mastered_Stage = masteredStage;
    }
}