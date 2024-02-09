export class MasteryRequirement {
    constructor(Mastery_ID, description) {
        this.Mastery_ID = Mastery_ID;
        this.Description = description;
    }
    
    static getMasteryRequirementFromArray(arr) {
        const MasteryRequirementArray = arr.map(obj =>
            new MasteryRequirement(obj.Mastery_ID, obj.Description)
        );
        return MasteryRequirementArray;
    }
}