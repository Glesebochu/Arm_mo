// document.addEventListener("DOMContentLoaded", function () {
//     // Get the iframe element
//     var sidePanelIframe = document.querySelector(".side-panel");

//     // Add a load event listener to the iframe
//     sidePanelIframe.addEventListener("load", function () {
//         // Access the contentDocument of the iframe
//         var sidePanelDocument = sidePanelIframe.contentDocument;

//         // Check if the document inside the iframe has loaded
//         if (sidePanelDocument) {
//             // Get the timer button inside the iframe
//             var timerButton = sidePanelDocument.querySelector(".timer-button");
//             // Get the pause button inside the iframe
//             var pauseButton = sidePanelDocument.querySelector(".settings-button");

//             // Add a click event listener to the timer button
//             timerButton.addEventListener("click", function () {
//                 // Fade out the body
//                 document.body.style.opacity = 0;

//                 // After a delay, navigate to the timer.php page
//                 setTimeout(function () {
//                     window.location.href = "side-Panel/timer.php";
//                 }, 500); // Adjust the delay (in milliseconds) as needed
//             });

//             // Add a click event listener to the settings button
//             pauseButton.addEventListener("click", function () {
//                 // Fade out the body
//                 document.body.style.opacity = 0;

//                 // After a delay, navigate to the settings.html page
//                 setTimeout(function () {
//                     window.location.href = "side-Panel/pause.html";
//                 }, 500); // Adjust the delay (in milliseconds) as needed
//             });
//         }
//     });
// });

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