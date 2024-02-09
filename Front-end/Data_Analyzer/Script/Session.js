// import { Session } from "../../../Middle-logic/Models/Session";
// import { Step } from "../../../Middle-logic/Models/Step";
// import { Stage } from "../../../Middle-logic/Models/Stage";
// import { Activity } from "../../../Middle-logic/Models/Activity";// displays the Session summary by populating the session.html page

function displaySessionionSummary(session) {
  session.Steps.map((step) => {
    if (step.Title == "Goal") {
      document.getElementById(
        "goal"
      ).innerHTML = `<span class="boldText">Goal: </span>${step.Response}`;
    }
  });
  session.Steps.map((step) => {
    if (step.Title == "Activity") {
      document.getElementById(
        "activity"
      ).innerHTML = `<span class="boldText">Acvtivity: </span>${step.Response.Title}`;
    }
  });
  session.Steps.map((step) => {
    if (step.Title == "Motivation") {
      document.getElementById(
        "motivations"
      ).innerHTML = `<span class="boldText">Motivation: </span> ${step.Response}`;
    }
  });
  session.Steps.map((step) => {
    if (step.Title == "Distractions") {
      document.getElementById(
        "distractions"
      ).innerHTML = `<span class="boldText">Distractions: </span>${step.Response}`;
    }
  });
  document.getElementById(
    "ahaMoments"
  ).innerHTML = `<span class="boldText">Number of Aha-Moments: </span>${getAhaMomentsCount(
    session.AhaMoments
  )}`;

  session.Steps.map((step) => {
    if (step.Title == "Activity") {
      document.getElementById(
        "meditationObject"
      ).innerHTML = `<span class="boldText">Meditation Object: </span>${step.MeditationObject}`;
    }
  });

  document.getElementById(
    "stagesTraversed"
  ).innerHTML = `<span class="boldText">Meditaion stages you've played: </span><br>${getStagesTraversed(
    session.PracticedStages
  )}`;

  document.getElementById(
    "newlyMastered"
  ).innerHTML = `<span class="boldText">New Stages you've Masterd:<br> </span>${getNewlyMasteredStages(
    session.Newly_Mastered_Stages
  )}`;

  document.getElementById(
    "currentStage"
  ).innerHTML = `<span class="boldText">Stage </span>${getCurrentStage(
    session.Newly_Mastered_Stages
  )}`;
  var prepDuration=0;
  session.Steps.map(step=> {
   (step.Catagory == "Preparation")?
      (prepDuration += step.Duration):''
    });
  document.getElementById(
    "prepDuration"
  ).innerHTML = `<span class="boldText">Preparation Time Duration: </span>${prepDuration}`;

  var transitionDuration=0;
  session.Steps.map(step=> {
   (step.Catagory == "Transition")?
      (transitionDuration += step.Duration):''
    });
  document.getElementById(
    "transitionDuration"
  ).innerHTML = `<span class="boldText">Transition Time Duration: </span>${transitionDuration}`;

  document.getElementById(
    "startDateTime"
  ).innerHTML = `<span class="boldText">Start Date & Time: </span>${session.Start_Date_Time}`;
  
  document.getElementById(
    "endDateTime"
  ).innerHTML = `<span class="boldText">End Date & Time: </span>${session.End_Date_Time}`;
  
 var totalDuration=prepDuration+transitionDuration;
  document.getElementById(
    "totalDuration"
  ).innerHTML = `<span class="boldText">Total session Time: </span>${totalDuration}`;
}

var step = [1, 2, 3];
function getStagesTraversed(array) {
  array = array.join(" ");
  return array;
}
function getNewlyMasteredStages(array) {
  array = array.join(" ");
  return array;
}
function getCurrentStage(array) {
  return array[array.length - 1];
}
function getAhaMomentsCount(array) {
  return array.reduce((total, currentValue) => total + currentValue, 0);
}

// // Dummy Session class & testing
class Session {
  constructor(
    Session_ID,
    meditator,
    startDateTime,
    endDateTime,
    practicedStages = [],
    ahaMoments = [],
    steps = [],
    newlyMasteredStages = []
  ) {
    this.Session_ID = Session_ID;
    this.Meditator = meditator;
    this.Start_Date_Time = startDateTime;
    this.End_Date_Time = endDateTime;
    this.PracticedStages = practicedStages;
    this.AhaMoments = ahaMoments;
    this.Steps = steps;
    this.Newly_Mastered_Stages = newlyMasteredStages;
  }
}
steps = [
  {
    Title: "Goal",
    Response: "Goal",
    Catagory: "Preparation",
    Duration: 10
  },
  {
    Title: "Activity",
    Catagory: "Preparation",
    Response: {
      Title: "breathing",
    },
    MeditationObject: "Breath",
    Duration: 10
  },
  {
    Title: "Motivation",
    Response: "Moma",
    Catagory: "Transition",
    Duration: 10

  },
  {
    Title: "Distractions",
    Response: "Noise",
    Catagory: "Transition",
    Duration: 10
  },
];
var session = new Session(1, 2, 3, 4, step, step, steps, step);

displaySessionionSummary(session);
