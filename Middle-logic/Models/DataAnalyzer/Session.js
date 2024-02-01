// displays the session summary by populating the Session.html page
function displaySessionSummary(session) {
  const sessionDataConatainer = document.getElementsByClassName(
    ".sessionDataContainer"
  );
  document.getElementById("stage").innerHTML = `Stage: ${session.stage}`;
  document.getElementById("activity").innerHTML =
    "Activity: " + session.activity;
  document.getElementById("goal").innerHTML = `Goal: ${session.goal}`;
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
  ).innerHTML = `Total Session Time: ${session.totalDuration}`;
}
class sess{
 stage ='a';
 activity='a';
 goal ='a';
 motivations ='a';
 distractions ='a';
 ahaMomentsCount ='a';
 prepDuration ='a';
 transitionDuration ='a';
 startDateTime ='a';
 endDateTime='a';
 totalDuration ='a';
}
var se= new sess();
displaySessionSummary(se);