import { Stage } from "../../../Middle-logic/Models/Stage.js";

console.log("Script is executing!");

export function displayStageInformation() {
    
    const innerContainer = document.getElementById('stageInfoContainer');
    const stageOne = Stage.stageOne;

    // Create HTML elements dynamically
    const stageIDElement = document.createElement('h1');
    stageIDElement.textContent = `Stage ${stageOne.Stage_ID}`;
    const goalElement = document.createElement('h2');
    goalElement.textContent = `Goal: ${stageOne.Goal}`;

    const intentionsList = document.createElement('ul');
    stageOne.Intentions.forEach((intention) => {
        const intentionItem = document.createElement('li');
        intentionItem.textContent = intention;
        intentionsList.appendChild(intentionItem);
    });

    const obstaclesList = document.createElement('ul');
    stageOne.Obstacles.forEach((obstacle) => {
        const obstacleItem = document.createElement('li');
        obstacleItem.textContent = obstacle;
        obstaclesList.appendChild(obstacleItem);
    });

    const skillsList = document.createElement('ul');
    stageOne.Skills.forEach((skill) => {
        const skillItem = document.createElement('li');
        skillItem.textContent = skill;
        skillsList.appendChild(skillItem);
    });

    innerContainer.appendChild(stageIDElement);
    // innerContainer.appendChild(document.createElement('hr'));
    innerContainer.appendChild(goalElement);
    // innerContainer.appendChild(document.createElement('hr'));
    innerContainer.appendChild(document.createElement('h3')).textContent = 'Intentions:';
    innerContainer.appendChild(intentionsList);
    // innerContainer.appendChild(document.createElement('hr'));
    innerContainer.appendChild(document.createElement('h3')).textContent = 'Obstacles:';
    innerContainer.appendChild(obstaclesList);
    // innerContainer.appendChild(document.createElement('hr'));
    innerContainer.appendChild(document.createElement('h3')).textContent = 'Skills:';
    innerContainer.appendChild(skillsList);

    

    console.log("Script is executing!");



    document.addEventListener('DOMContentLoaded', function () {
        const innerContainer = document.getElementById('stageInfoContainer');
        const stageButton = document.querySelector('.stage-button');
        const nextStageButton = document.querySelector('.next-stage');
        const previousStageButton = document.querySelector('.previous-stage');
    
        let currentStage = 1;
    
        const updateStageButton = () => {
            // Ensure currentStage stays within the range of 1 to 10
            currentStage = Math.max(1, Math.min(10, currentStage));
            stageButton.textContent = currentStage;
        };
    
        previousStageButton.addEventListener('click', () => {
            currentStage--;
    
            updateStageButton();
        });
    
        nextStageButton.addEventListener('click', () => {
            currentStage++;
    
            updateStageButton();
        });
    
        updateStageButton();
    });
}

displayStageInformation();