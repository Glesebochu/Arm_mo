export function setUpGamePage(stage){

    var stageNum = document.querySelector('.stage-number');
    stageNum.textContent = stage.Stage_ID;

    document.addEventListener("DOMContentLoaded", function () {
        
        var timerButton = document.querySelector(".timer-button");
        
        timerButton.addEventListener("click", function () {
            // Fade out the body
            document.body.style.opacity = 0;
            
            // After a delay, navigate to the timer.php page
            setTimeout(function () {
                window.location.href = "Side-Panel/timer.php";
            }, 500); // Adjust the delay (in milliseconds) as needed
        });
    });
    
    document.addEventListener("DOMContentLoaded", function () {
        
        var pauseButton = document.querySelector(".settings-button");
        
        pauseButton.addEventListener("click", function () {
            
            document.body.style.opacity = 0;
            
            setTimeout(function () {
                window.location.href = "Side-Panel/pause.html";
            }, 500);
        });
    });

    document.addEventListener("DOMContentLoaded", function () {
        
        var pauseButton = document.querySelector(".stage-button");
        
        pauseButton.addEventListener("click", function () {
            
            document.body.style.opacity = 0;
            
            setTimeout(function () {
                window.location.href = "Side-Panel/stageInformation.php";
            }, 500);
        });
    });
}