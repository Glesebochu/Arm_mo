export class AhaMoment{
    constructor(id, label){
        this.AhaMoment_ID = id;
        this.Label = label;
    }
    static getAhaMomentFromObject(obj){
        return new AhaMoment(
            obj.AhaMoment_ID,
            obj.Label,
        );
    }
    static getAhaMomentsFromArrayObject(arr){
        var AhaMoments= arr.map(AhaMoment.getAhaMomentFromObject);
        return AhaMoments;
    }
}