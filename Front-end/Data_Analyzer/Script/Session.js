class Session {
  constructor(
    motivations,
    goal,
    distractions,
    activity,
    ahaMomentsCount,
    stages
  ) {
    this.motivations = motivations;
    this.goal = goal;
    this.distractions = distractions;
    this.activityType = activity.type;
    this.ahaMomentsCount = ahaMomentsCount;
    this.stages = stages.id;
  }
  // displays the sessions data by populating the html page
  display() {
    const sessionDataConatainer = document.getElementsByClassName(
      ".sessionDataContainer"
    );
    document.getElementById("stage").innerHTML = `Stage: ${this.stages}`;
    document.getElementById("activity").innerHTML =
      "Activity: " + this.activityType;
    document.getElementById("goal").innerHTML = `Goal: ${this.goal}`;
    document.getElementById(
      "motivations"
    ).innerHTML = `Motivations: ${this.motivations}`;
    document.getElementById(
      "distractions"
    ).innerHTML = `Distractions: ${this.distractions}`;
    document.getElementById(
      "ahaMoments"
    ).innerHTML = `Number of Aha-Moments: ${this.ahaMomentsCount}`;
    document.getElementById("startDateTime").innerHTML = "Start Date & Time: ";
    document.getElementById("endDateTime").innerHTML = "End Date & Time: ";
  }
  duration() {}
}
// Dummy class
class Activity {
  constructor(id, type) {
    this.id = id;
    this.type = type;
  }
}
class Stages {
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }
}
var stages = new Stages(1);
var activity = new Activity(1, "Reading");
// console.log(session);
// helper class
class Helper {
  counter = 0;

  countAhas() {
    // var ahaButton=document.getElementById('button');
    // ahaButton.addEventListener('click',function(a){
    //     this.counter++;
    // })
    return this.counter;
  }
}
var helper = new Helper();
console.log(helper.countAhas());

var session = new Session(
  "stay focused",
  "Focus",
  "stress",
  activity,
  helper.countAhas(),
  stages
);
session.display();
// attach the aha buttons name here
// document.getElementById("ahaButton").addEventListener("click", handleClick);
// document.getElementById("motivationNext").addEventListener("click", handleClickMotivation);
// document.getElementById("distractionNext").addEventListener("click", handleClickDistractio);
// document.getElementById("goalNext").addEventListener("click", handleClickGoal);
// variables that hold the time values from the step class
var prepDuration=
var session = new Session(
  helper.motivations,
  helper.goal,
  helper.distractions,
  activity,
  helper.countAhas(),
  helper.counter,
  stages
);
session.display();
