export class AntidoteType{
    static Dullness = "Dullness";
    static Agitation = "Agitation"; 
}
export class SeverityType{
    static Mild = "Mild";
    static Moderate = "Moderate";
    static Severe = "Severe";
}
export class Antidote{
    constructor(id, type=AntidoteType.Agitation, severity=SeverityType.Moderate, description){
        this.Id = id;
        this.Type = type;
        this.Severity = severity;
        this.Description = description;
    }
}
