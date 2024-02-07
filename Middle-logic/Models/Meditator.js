export class Meditator{
    constructor(First_Name, Last_Name, username, password, currentStageNo){
        this.First_Name = First_Name;
        this.Last_Name = Last_Name;
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