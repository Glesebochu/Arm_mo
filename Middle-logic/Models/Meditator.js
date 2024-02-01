export class Meditator{
    constructor(firstName, lastName, username, email, password, currentStage){
        this.First_Name = firstName;
        this.Last_Name = lastName;
        this.Username = username;
        this.Email = email;
        this.Password = password;
        this.Current_Stage = currentStage;
    }

    startMeditation(){
        // Create and initialize a new Session object.
        var newSession = new Session();
        newSession.Meditator = this;
        newSession.Start_Date_Time = Date.now();

        // Call the displayPreparationDialogue() function to display a dialogue for the meditator.
        InterfaceBuilder.displayPreparationDialogue();
        
        // Call the displayTransitionDialogue() function to display a dialogue for the meditator.
        InterfaceBuilder.displayTransitionDialogue();

    }

    stopMeditation(){}
}