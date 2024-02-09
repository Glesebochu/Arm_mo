export class AhaMoment{
    constructor(id,Session_ID, label){
        this.AhaMoment_ID = id;
        this.Session_ID=Session_ID;
        this.Label = label;
    }
    static getAhaMomentFromObject(obj){
        return new AhaMoment(
            obj.AhaMoment_ID,
            obj.Session_ID,
            obj.Label,
        );
    }
    static getAhaMomentsFromArrayObject(arr){
        var AhaMoments= arr.map(AhaMoment.getAhaMomentFromObject);
        return AhaMoments;
    }
}