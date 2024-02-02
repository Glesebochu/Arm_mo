import { Session } from "../../../Middle-logic/Models/Session.js";
import { Meditator } from "../../../Middle-logic/Models/Meditator.js";
import { Stage } from "../../../Middle-logic/Models/Stage.js";

function masteryCheck(session){
    // First, generate as many input boxes as needed for the stage.
    // Access the stage object. This will be replaced by a database query.
    var stage = Stage.createStages().filter(stage => stage.Number == session.Ending_Stage_No)[0];
    console.log(stage);
    console.log(session);

    // Access all the DOM elements.
    var requirements_div = document.getElementById("masteryCheck-requirements");
    var next_button = document.getElementById("masteryCheck-nextButton");
    var congrats_div = document.getElementById('congrats-message');
    var checkboxes = document.getElementsByClassName('masteryCheck-checkbox');
    var glad_button = document.getElementById("masteryCheck-gladButton");
    console.log(glad_button);

    // Function for converting a requirement into a list item in the appropriate div.
    function addRequirementToList(req, index){
        var new_input_label_pair = document.createElement('div');
        new_input_label_pair.classList.add('masteryCheck-input-label-pair');

        var new_input = document.createElement('input');
        new_input.setAttribute('type', 'checkbox')
        new_input.setAttribute('name', `MasteryRequirement${index}`)
        new_input.classList.add('masteryCheck-checkbox');
        
        var new_label = document.createElement('label');
        new_label.setAttribute('for', `MasteryRequirement${index}`);
        new_label.textContent = req;

        new_input_label_pair.appendChild(new_input);
        new_input_label_pair.appendChild(new_label);
        requirements_div.appendChild(new_input_label_pair);
    }

    // Function for congratulating the meditator for every mastery.
    function congratulate(){
        console.log("Inside Congratulate.");
        session.Mastered_Stage = true;
        congrats_div.style.display = 'grid';
        console.log(congrats_div);
    }

    // Add requirements to the div.
    var requirements = stage.Mastery_Requirements;
    for (let i = 0; i < requirements.length; i++) {
        const req = requirements[i];
        addRequirementToList(req, i+1);
    }

    // If all the boxes are ticked and the user clicks on the button, display congrats message.
    next_button.addEventListener('click', () => {
        
        var mastered = true;
        Array.from(checkboxes).forEach(element => {
            if (!element.checked) {
                mastered = false;
                console.log("Not checked.");
            }
        });
        if(mastered) congratulate();

        continueToNextPage();
    });

    // If the meditator clicks on the I'm glad button, remove the congrats div from view.
    glad_button.addEventListener('click', (event) => {
        congrats_div.style.display = 'none';
        continueToNextPage();
    });

    function continueToNextPage(){
        // Open the summary page.
        console.log("Open the summary page.");
    }

}

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
newSession.Stage_Numbers = [1, 2, meditator.Current_Stage_No];
newSession.Ending_Stage_No = 2;

console.log(newSession);

masteryCheck(newSession);