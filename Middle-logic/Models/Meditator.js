export class Meditator{
    constructor(firstName, lastName, username, password, currentStageNo){
        this.First_Name = firstName;
        this.Last_Name = lastName;
        this.Username = username;
        this.Password = password;
        this.Current_Stage_No = currentStageNo;
    }

    static getMeditatorFromObject(obj) {
        return new Meditator(
            obj.First_Name,
            obj.Last_Name,
            obj.Username,
            obj.Password,
            obj.Current_Stage_No
        )
    }
}