console.log("Script is executing!");

export function displayStageInformation(stage) {
    
    const innerContainer = document.getElementById('stageInfoContainer');

    // Create HTML elements dynamically
    const stageIDElement = document.createElement('h1');
    stageIDElement.textContent = `Stage ${stage.Stage_ID}`;
    const goalElement = document.createElement('h2');
    goalElement.textContent = `Goal: ${stage.Goal}`;

    const intentionsList = document.createElement('ul');
    stage.Intentions.forEach((intention) => {
        const intentionItem = document.createElement('li');
        intentionItem.textContent = intention.Description;
        intentionsList.appendChild(intentionItem);
    });

    const obstaclesList = document.createElement('ul');
    stage.Obstacles.forEach((obstacle) => {
        const obstacleItem = document.createElement('li');
        obstacleItem.textContent = obstacle.Description;
        obstaclesList.appendChild(obstacleItem);
    });

    const skillsList = document.createElement('ul');
    stage.Skills.forEach((skill) => {
        const skillItem = document.createElement('li');
        skillItem.textContent = skill.Description;
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
    
        let currentStage = stage.Stage_ID;
    
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
    // Get the triangle button
    var triangleButton = document.querySelector(".triangle-button");

    // Add a click event listener to the triangle button
    triangleButton.addEventListener("click", function () {
        // Fade out the body
        document.body.style.opacity = 0;

        // After a delay, navigate to the Game UI.php page
        setTimeout(function () {
            window.history.back();
        }, 500); // Adjust the delay (in milliseconds) as needed
    });
}