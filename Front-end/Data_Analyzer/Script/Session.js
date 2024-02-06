// displays the Session summary by populating the session.html page

function displaySessionionSummary(session) {
  document.getElementById("goal").innerHTML = `<span class="boldText">Goal</span>: ${session.goal}`;
 
  document.getElementById(
    "activity"
  ).innerHTML = `<span class="boldText">Activity: </span> ${session.activity}`;


  document.getElementById(
    "motivations"
  ).innerHTML = `<span class="boldText">Motivations: </span>${session.motivations}`;
 

  document.getElementById(
    "distractions"
  ).innerHTML = `<span class="boldText">Distractions: </span>${session.distractions}`;


  document.getElementById(
    "ahaMoments"
  ).innerHTML = `<span class="boldText">Number of Aha-Moments: </span>${session.ahaMomentsCount}`;


  document.getElementById(
    "meditationObject"
  ).innerHTML = `<span class="boldText">Meditation Object: </span>${session.meditationObject}`;
  document.getElementById(
    "stagesTraversed"
  ).innerHTML = `<span class="boldText">Meditaion stages you've played: </span><br>${getStagesTraversed(
    session.stage
  )}`;
  document.getElementById(
    "newlyMastered"
  ).innerHTML = `<span class="boldText">New Stages you've Masterd:<br> </span>${getNewlyMasteredStages(
    session.newlyMasteredStages
  )}`;
  document.getElementById(
    "currentStage"
  ).innerHTML = `<span class="boldText">Stage </span>${getCurrentStage(session.stage)}`;
  document.getElementById(
    "prepDuration"
  ).innerHTML = `<span class="boldText">Preparation Time Duration: </span>${session.prepDuration}`;
  document.getElementById(
    "transitionDuration"
  ).innerHTML = `<span class="boldText">Transition Time Duration: </span>${session.transitionDuration}`;
  document.getElementById(
    "startDateTime"
  ).innerHTML = `<span class="boldText">Start Date & Time: </span>${session.startDateTime}`;
  document.getElementById(
    "endDateTime"
  ).innerHTML = `<span class="boldText">End Date & Time: </span>${session.endDateTime}`;
  document.getElementById(
    "totalDuration"
  ).innerHTML = `<span class="boldText">Total session Time: </span>${session.totalDuration}`;
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
