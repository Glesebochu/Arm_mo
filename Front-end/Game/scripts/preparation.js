import { DBAssistant } from "../../../Middle-logic/Utilities/DBAssistant.js";
import { Step, StepCategory, StepType } from "../../../Middle-logic/Models/Step.js";
import { Session } from "../../../Middle-logic/Models/Session.js";
import { Meditator } from "../../../Middle-logic/Models/Meditator.js";
import { Activity } from "../../../Middle-logic/Models/Activity.js";

// Dummy object to be replaced by the object obtained with Gustav's DB -> JS object function.
var meditator = new Meditator(
    "Zelalem",
    "Amare",
    "fellasfaw@gmail.com",
    "test",
    3
);

// Dummy object to be replaced by the object obtained with Gustav's DB -> JS object function.
var newSession = new Session();
newSession.Meditator = meditator;
newSession.Start_Date_Time = Date.now();

prepare(newSession);

export function prepare(session){

    // Get the steps from the database.
    var steps = DBAssistant.getRecords("Step", "Category", "Preparation");

    // Declare variables for traversal and calculations.
    var currentStepIndex = 0;
    var currentStep = steps[currentStepIndex];
    var currentStepStartTime = 0;
    var currentStepStopTime = 0;

    // Declare variables for DOM elements.
    var title = document.getElementById("preparation-title");
    var description = document.getElementById("preparation-description");
    var text_input = document.getElementById("preparation-input");
    var select_input = document.getElementById("preparation-activity-select");
    var error = document.getElementById("preparation-error-message");
    var previousButton = document.getElementById("preparation-previous");
    var nextButton = document.getElementById("preparation-next");

    function addOptionsToActivityDropDown(){
        var activityList = Activity.getAllActivities();
        activityList.forEach(activity => {
            var newActivity = document.createElement('option');
            newActivity.textContent = activity.Title;
            newActivity.style.display = "block";
            select_input.appendChild(newActivity);
        });
    }
    addOptionsToActivityDropDown();
    
    function updatePage() {
        currentStep = steps[currentStepIndex];
        title.textContent = currentStep.Title;
        description.textContent = currentStep.Description;
        if (currentStep.Type != StepType.Question) {
            text_input.style.visibility = "hidden";
        } else {
            text_input.style.visibility = "visible";
        }

        // If it's the first (Activity selection) step, dispaly the drop down menu for selection.
        if (currentStep.Title == "Activity"){
            text_input.style.display = "none";
            select_input.style.display = "block";
        }else{
            text_input.style.display = "block";
            select_input.style.display = "none";
        }

        // Disable the previous button if it's the first step.
        if (currentStepIndex == 0) {
            previousButton.disabled = true;
        }
        else{
            previousButton.disabled = false;
        }

        // If the step is an instruction, rename the button to "Okay"
        if (currentStep.Type == StepType.Instruction){
            nextButton.textContent = "Okay";
        }else{
            nextButton.textContent = "Next";
        }

        // If the meditator has already responded to the step, show the response in the input box.
        if (steps[currentStepIndex].Response != ""){
            text_input.value = steps[currentStepIndex].Response;
        }
        
        // Log the start time of the current step.
        currentStepStartTime = Date.now();
    }
    updatePage();
    
    previousButton.addEventListener('click', () => goToPreviousStep());
    
    nextButton.addEventListener('click', () => goToNextStep());

    text_input.addEventListener('keydown', (event) => {
        if(event.key === "Enter"){
            goToNextStep();
        }
    });

    function goToPreviousStep(){
        if (currentStepIndex > 0)
            currentStepIndex--;
        
        updatePage();
    }

    function goToNextStep(){
        // If there is an input box and it is empty, tell the meditator to fill it in.
        if(currentStep.Type == StepType.Question && text_input.value == "" && currentStep.Title != "Activity"){
            error.style.display = "block";
        }
        // If the input box is filled...
        else{
            // Remove the error message.
            error.style.display = "none";
    
            // Log the stop time and set the duration of the step.
            currentStepStopTime = Date.now();
            currentStep.Duration += (currentStepStopTime - currentStepStartTime) / 1000;
    
            // Save the response in the current step object.
            
            // Save the response with an object for the "Activity" step.
            if(currentStep.Title == "Activity"){
                let chosenIndex = select_input.selectedIndex;
                let chosenActivity = Activity.getAllActivities().filter(a => a.Title == select_input[chosenIndex].textContent)[0];
                currentStep.Response = chosenActivity;
            }else{
                currentStep.Response = text_input.value;
            }
    
            // If there are steps left in the array, increment the currentStepIndex.
            if (currentStepIndex < steps.length - 1) 
                currentStepIndex++;
            // If this is the last step, go to the transition phase.
            else {
                session.Steps = steps;
                // window.location.href = "./transition.html";
                // session.Steps.push(new Step(), new Step(), new Step());
                console.log(session);
                // console.log(session.Steps.filter(step => step.Category == StepCategory.Preparation));
            }
    
            // Clear the input box.
            text_input.value = "";
            updatePage();
        }

    }
}
