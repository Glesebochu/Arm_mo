class Session {
    constructor(meditator, activity, goal, motivation, distractions = [], startDateTime, endDateTime, stages = [], ahaMoments = []) {
        this.Meditator = meditator;
        this.Activity = activity;
        this.Goal = goal;
        this.Motivation = motivation;
        this.Distractions = distractions;
        this.Start_Date_Time = startDateTime;
        this.End_Date_Time = endDateTime;
        this.Stages = stages;
        this.Aha_Moments = ahaMoments;
    }
}