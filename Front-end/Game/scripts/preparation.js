import {DBAssistant} from "../../../Middle-logic/Utilities/DBAssistant.js";

// Get the steps from the database.
var steps = DBAssistant.getRecords("Step", "Category", "Preparation");

var currentStepIndex = 0;

var title = document.getElementById("preparation-title");
title.textContent = steps[currentStepIndex].Title;

var description = document.getElementById("preparation-description");
description.textContent = steps[currentStepIndex].Description;

if(steps[currentStepIndex].Type != "Question"){
    var input = document.getElementById("preparation-input");
    input.style.visibility = "hidden";
}

var previousButton = document.getElementById("preparation-previous");
previousButton.addEventListener('click', () => {
    if(currentStepIndex > 0) currentStepIndex--;
})

var nextButton = document.getElementById("preparation-next");
nextButton.addEventListener('click', () => {
    if(currentStepIndex < steps.length-1) currentStepIndex++;
    else{
        // Code for going to the transition phase.
    }
})