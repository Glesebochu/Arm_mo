import { AhaMoment } from "./AhaMoment.js";
import { Meditator } from "./Meditator.js";
import { Stage } from "./Stage.js";
import { Step } from "./Step.js";

export class Session {
    constructor(Session_ID, meditator, startDateTime, endDateTime, practicedStages = [], ahaMoments = [], steps = [], newlyMasteredStages = []) {
        this.Session_ID = Session_ID;
        this.Meditator = meditator;
        this.Start_Date_Time = startDateTime;
        this.End_Date_Time = endDateTime;
        this.PracticedStages = practicedStages;
        this.AhaMoments = ahaMoments;
        this.Steps = steps;
        this.Newly_Mastered_Stages = newlyMasteredStages;
    }
    static getSessionFromObject(obj) {
        return new Session(
            obj.Session_ID,
            Meditator.getMeditatorFromObject(obj.Meditator),
            obj.Start_Date_Time,
            obj.End_Date_Time,
            Stage.getStagesFromArrayObject(obj.PracticedStages),
            AhaMoment.getAhaMomentsFromArrayObject(obj.AhaMoments),
            Step.getStepsFromArrayObject(obj.Steps),
            [],
        );
    }
    static getSessionsFromArrayObject(arr) {
        return arr.map(this.getSessionFromObject);
    }

    // Function to send the Session object to the PHP script
    static updateSession(session) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://localhost/Arm-mo/Back-end/UpdateDatabase/UpdateSession.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
                } else {
                    console.error('Error:', xhr.status);
                }
            }
        };

        var params = "session=" + encodeURIComponent(JSON.stringify(session));
        xhr.send(params);
    }
    static createSession(session) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://localhost/Arm-mo/Back-end/UpdateDatabase/CreateSession.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
                } else {
                    console.error('Error:', xhr.status);
                }
            }
        };

        var params = "session=" + encodeURIComponent(JSON.stringify(session));
        xhr.send(params);
    }

}