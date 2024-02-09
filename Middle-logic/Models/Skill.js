export class Skill {
    constructor(id, description) {
        this.Skill_ID = id;
        this.Description = description;
    }
    static Create_Practice_Routine = "Creating practice routines";
    static Set_Specific_Goal = "Setting specific practice goals";
    static Generate_Strong_Motivation = "Generating strong motivation";
    static Cultivate_Discipline_Diligence = "Cultivating discipline and diligence";

    static Reinforce_Spontaneous_Introspective_Awareness = "Reinforcing spontaneous introspective awareness";
    static Sustain_Attention = "Learning to sustain attention on the meditation object";

    static Follow_Breath = "Following the breath";
    static Connect = "Connecting";
    static Label = "Labeling";
    static Check_In = "Checking in";

    static getSkillsFromArrayObject(arr) {
        var SkillObjects = arr.map(obj => new Skill(obj.Skill_ID, obj.Description));
        return SkillObjects;
      }
}