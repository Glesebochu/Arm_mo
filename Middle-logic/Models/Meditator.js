export class Meditator{
    constructor(Meditator_ID,First_Name, Last_Name, username, password, currentStageNo){
        this.Meditator_ID=Meditator_ID;
        this.First_Name = First_Name;
        this.Last_Name = Last_Name;
        this.Username = username;
        this.Password = password;
        this.Current_Stage_No = currentStageNo;
    }

    static getMeditatorFromObject(obj) {
        return new Meditator(
            obj.Meditator_ID,
            obj.First_Name,
            obj.Last_Name,
            obj.Username,
            obj.Password,
            obj.Current_Stage_No
        )
    }

    // Function to send the JavaScript object to the PHP script
    static updateMeditator(meditator) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '../../Back-end/UpdateDatabase/UpdateMeditator.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              console.log(xhr.responseText);
            } else {
              console.error('Error:', xhr.status);
            }
          }
        };
        
        var params = "meditator=" + encodeURIComponent(JSON.stringify(meditator));
        xhr.send(params);
      }
}