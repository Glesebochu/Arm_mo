import { prepare } from "../../Front-end/Game/scripts/preparation.js";
import { Session } from "./Session.js";

export class Meditator{
    constructor(firstName, lastName, username, email, password, currentStage){
        this.First_Name = firstName;
        this.Last_Name = lastName;
        this.Username = username;
        this.Email = email;
        this.Password = password;
        this.Current_Stage = currentStage;
    }

    startMeditation(stage){
        // Create and initialize a new Session object.
        var newSession = new Session();
        newSession.Meditator = this;
        newSession.Start_Date_Time = Date.now();

        prepare(this, newSession, stage);
    }

    stopMeditation(){}
}