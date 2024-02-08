export class AhaMoment{
    constructor(id, label){
        this.Aha_Moment_ID = id;
        this.Label = label;
    }
    static getAhaMomentFromObject(obj){
        return new AhaMoment(
            obj.Aha_Moment_ID,
            obj.Label,
        );
    }
}