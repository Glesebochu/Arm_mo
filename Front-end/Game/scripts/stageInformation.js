// import { Stage } from "../../../Middle-logic/Models/Stage.js";

console.log("Script is executing!");

// // Access the inner-container and stageOne object
// const innerContainer = document.getElementById('stageInfoContainer');
// const stageOne = Stage.stageOne;

// // Create HTML elements dynamically
// const goalElement = document.createElement('p');
// goalElement.textContent = `Goal: ${stageOne.Goal}`;

// const intentionsList = document.createElement('ul');
// stageOne.Intentions.forEach((intention) => {
//     const intentionItem = document.createElement('li');
//     intentionItem.textContent = intention;
//     intentionsList.appendChild(intentionItem);
// });

// const obstaclesList = document.createElement('ul');
// stageOne.Obstacles.forEach((obstacle) => {
//     const obstacleItem = document.createElement('li');
//     obstacleItem.textContent = obstacle;
//     obstaclesList.appendChild(obstacleItem);
// });

// const skillsList = document.createElement('ul');
// stageOne.Skills.forEach((skill) => {
//     const skillItem = document.createElement('li');
//     skillItem.textContent = skill;
//     skillsList.appendChild(skillItem);
// });

// // Append elements to the inner-container
// innerContainer.appendChild(goalElement);
// innerContainer.appendChild(document.createElement('hr'));
// innerContainer.appendChild(document.createElement('h3')).textContent = 'Intentions:';
// innerContainer.appendChild(intentionsList);
// innerContainer.appendChild(document.createElement('hr'));
// innerContainer.appendChild(document.createElement('h3')).textContent = 'Obstacles:';
// innerContainer.appendChild(obstaclesList);
// innerContainer.appendChild(document.createElement('hr'));
// innerContainer.appendChild(document.createElement('h3')).textContent = 'Skills:';
// innerContainer.appendChild(skillsList);

// console.log("Script is executing!");



// Game/scripts/stageInformation.js
// import { Stage } from "../../../Middle-logic/Models/Stage.js";

document.addEventListener('DOMContentLoaded', function () {
    // Access the inner-container and stageOne object
    const innerContainer = document.getElementById('stageInfoContainer');
    // const stageOne = Stage.stageOne;

    // Get references to the stage-button and next-stage elements
    const stageButton = document.querySelector('.stage-button');
    const nextStageButton = document.querySelector('.next-stage');
    const previousStageButton = document.querySelector('.previous-stage');

    // Set initial stage number
    let currentStage = 1;

    // Function to update the stage button content
    const updateStageButton = () => {
        stageButton.textContent = currentStage;
    };

    // Event listener for the next-stage button
    previousStageButton.addEventListener('click', () => {
        // Increment the current stage number
        currentStage--;

        // Update the stage button content
        updateStageButton();
    });
    nextStageButton.addEventListener('click', () => {
        // Increment the current stage number
        currentStage++;

        // Update the stage button content
        updateStageButton();
    });

    // Initial setup
    updateStageButton();

    // Rest of the code...
});