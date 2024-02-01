import { DBAssistant } from "../../../Middle-logic/Utilities/DBAssistant.js";
import { StepType } from "../../../Middle-logic/Models/Step.js";

export function prepare(meditator, session, stage){

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
    var input = document.getElementById("preparation-input");
    var error = document.getElementById("preparation-error-message");
    var previousButton = document.getElementById("preparation-previous");
    var nextButton = document.getElementById("preparation-next");
    
    function updatePage() {
        currentStep = steps[currentStepIndex];
        title.textContent = currentStep.Title;
        description.textContent = currentStep.Description;
        if (currentStep.Type != StepType.Question) {
            input.style.visibility = "hidden";
        } else {
            input.style.visibility = "visible";
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
        
        // Log the start time of the current step.
        currentStepStartTime = Date.now();
    }
    updatePage();
    
    previousButton.addEventListener('click', () => {
        if (currentStepIndex > 0)
            currentStepIndex--;
        updatePage();
    });
    
    nextButton.addEventListener('click', () => {
        goToNextStep();
    });

    input.addEventListener('keydown', (event) => {
        if(event.key === "Enter"){
            goToNextStep();
        }
    });

    function goToNextStep(){
        // If there is an input box and it is empty, tell the meditator to fill it in.
        if(currentStep.Type == StepType.Question && input.value == ""){
            error.style.display = "block";
        }
        // If the input box if filled...
        else{
            // Remove the error message.
            error.style.display = "none";
    
            // Log the stop time and set the duration of the step.
            currentStepStopTime = Date.now();
            currentStep.Duration = (currentStepStopTime - currentStepStartTime) / 1000;
    
            // Save the response in the current step object.
            currentStep.Response = input.value;
    
            // Increment the currentStepIndex.
            if (currentStepIndex < steps.length - 1) 
                currentStepIndex++;
            // Code for going to the transition phase.
            else {
                // session.Steps = steps;
                console.log(steps);
            }
    
            // Clear the input box.
            input.value = "";
            updatePage();
        }

    }
}
prepare();
