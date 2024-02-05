// displays the Session summary by populating the session.html page

function displaySessionionSummary(session) {
  document.getElementById("goal").innerText = ` <b>Goal: ${session.goal}`;
  document.getElementById(
    "activity"
  ).innerHTML = `Activity: ${session.activity}`;
  document.getElementById(
    "motivations"
  ).innerHTML = `Motivations: ${session.motivations}`;
  document.getElementById(
    "distractions"
  ).innerHTML = `Distractions: ${session.distractions}`;
  document.getElementById(
    "ahaMoments"
  ).innerHTML = `Number of Aha-Moments: ${session.ahaMomentsCount}`;
  document.getElementById(
    "meditationObject"
  ).innerHTML = `Meditation Object: ${session.meditationObject}`;
  document.getElementById(
    "stagesTraversed"
  ).innerHTML = `Meditaion stages you've played: <br>${getStagesTraversed(
    session.stage
  )}`;
  document.getElementById(
    "newlyMastered"
  ).innerHTML = `New Stages you've Masterd:<br> ${getNewlyMasteredStages(
    session.newlyMasteredStages
  )}`;
  document.getElementById(
    "currentStage"
  ).innerHTML = `Stage ${getCurrentStage(session.stage)}`;
  document.getElementById(
    "prepDuration"
  ).innerHTML = `Preparation Time Duration: ${session.prepDuration}`;
  document.getElementById(
    "transitionDuration"
  ).innerHTML = `Transition Time Duration: ${session.transitionDuration}`;
  document.getElementById(
    "startDateTime"
  ).innerHTML = `Start Date & Time: ${session.startDateTime}`;
  document.getElementById(
    "endDateTime"
  ).innerHTML = `End Date & Time: ${session.endDateTime}`;
  document.getElementById(
    "totalDuration"
  ).innerHTML = `Total session Time: ${session.totalDuration}`;
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
  return array[array.length-1];
}
// Dummy Session class
class Session {
  constructor(
    goal,
    activity,
    motivations,
    distractions,
    ahaMomentsCount,
    meditationObject,
    stage,
    newlyMasteredStages,
    currentStage,
    prepDuration,
    transitionDuration,
    startDateTime,
    endDateTime,
    totalDuration
  ) {
    this.goal=goal;
    this.activity=activity;
    this.motivations=motivations;
    this.distractions=distractions;
    this.ahaMomentsCount=ahaMomentsCount;
    this.meditationObject=meditationObject;
    this.stage=stage;
    this.newlyMasteredStages=newlyMasteredStages;
    this.currentStage=currentStage;
    this.prepDuration=prepDuration;
    this.transitionDuration=transitionDuration;
    this.startDateTime=startDateTime;
    this.endDateTime=endDateTime;
    this.totalDuration=totalDuration;
  }
}
var session = new Session('a', "a", "a", "a", "a", 'a', step, step, step, "a", "a","a","a",'a');
displaySessionionSummary(session);
