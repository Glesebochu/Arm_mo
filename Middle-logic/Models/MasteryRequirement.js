export class MasteryRequirement {
    constructor(Mastery_ID, description, stage) {
        this.Mastery_ID = Mastery_ID;
        this.Description = description;
        this.Stage = stage;
    }
    
    static getMasteryRequirementFromArray(arr) {
        const MasteryRequirementArray = arr.map(obj =>
            new MasteryRequirement(obj.Mastery_ID, obj.Description, obj.Stage)
        );
        return MasteryRequirementArray;
    }
}