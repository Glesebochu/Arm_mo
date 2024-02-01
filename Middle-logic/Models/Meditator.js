import { prepare } from "../../Front-end/Game/scripts/preparation.js";
import { Session } from "./Session.js";

export class Meditator{
    constructor(firstName, lastName, username, password, currentStage){
        this.First_Name = firstName;
        this.Last_Name = lastName;
        this.Username = username;
        this.Password = password;
        this.Current_Stage = currentStage;
    }
}