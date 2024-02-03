export class Meditator{
    // constructor(firstName, lastName, username, password, currentStageNo){
    //     this.First_Name = firstName;
    //     this.Last_Name = lastName;
    //     this.Username = username;
    //     this.Password = password;
    //     this.Current_Stage_No = currentStageNo;
    // }

    constructor(meditator) {
        this.First_Name = meditator.First_Name;
        this.Last_Name = meditator.Last_Name;
        this.Username = meditator.Username;
        this.Password = meditator.Password;
        this.Current_Stage_No = meditator.Current_Stage_No;
    }
}