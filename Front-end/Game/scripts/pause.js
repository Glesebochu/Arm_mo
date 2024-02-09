export function displayPausePage() {
    function navigateWithFadeOut(destination) {
        // Fade out the body
        document.body.style.opacity = 0;

        // After a delay, navigate to the specified destination
        setTimeout(function () {
            window.location.href = destination;
        }, 500); // Adjust the delay (in milliseconds) as needed
    }

    // Get the triangle button
    var triangleButton = document.querySelector(".triangle-button");
    var resumeButton = document.querySelector(".resume-button");
    var restartButton = document.querySelector(".restart-button");
    var mainMenuButton = document.querySelector(".main-menu-button");

    // Add a click event listener to the triangle button
    triangleButton.addEventListener("click", function () {
        navigateWithFadeOut("../Dummy Game UI.html");
    });

    // Add a click event listener to the resume button
    resumeButton.addEventListener("click", function () {
        navigateWithFadeOut("../Game UI.html");
    });

    // Add a click event listener to the restart button
    restartButton.addEventListener("click", function () {
        navigateWithFadeOut("../Main-Panel/preparation.php");
    });

    // Add a click event listener to the main menu button
    mainMenuButton.addEventListener("click", function () {
        navigateWithFadeOut("https://localhost/Arm-mo/Front-end/home-settings/home-page.php");
    });
}

document.addEventListener("DOMContentLoaded", displayPausePage);