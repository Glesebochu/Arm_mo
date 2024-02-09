document.addEventListener("DOMContentLoaded", function () {
    // Get the triangle button
    var triangleButton = document.querySelector(".triangle-button");
    var resumeButton = document.querySelector(".resume-button");
    var restartButton = document.querySelector(".restart-button");
    var mainMenuButton = document.querySelector(".main-menu-button");

    // Add a click event listener to the triangle button
    triangleButton.addEventListener("click", function () {
        // Fade out the body
        document.body.style.opacity = 0;

        // After a delay, navigate to the Dummy Game UI.html page
        setTimeout(function () {
            window.location.href = "../Dummy Game UI.html";
        }, 500); // Adjust the delay (in milliseconds) as needed
    });

    // Add a click event listener to the resume button
    resumeButton.addEventListener("click", function () {
        // Fade out the body
        document.body.style.opacity = 0;

        // After a delay, navigate to the Dummy Game UI.html page
        setTimeout(function () {
            window.location.href = "../Dummy Game UI.html";
        }, 500); // Adjust the delay (in milliseconds) as needed
    });

    // Add a click event listener to the resume button
    restartButton.addEventListener("click", function () {
        // Fade out the body
        document.body.style.opacity = 0;

        // After a delay, navigate to the Dummy Game UI.html page
        setTimeout(function () {
            window.location.href = "../Dummy Game UI.html";
        }, 500); // Adjust the delay (in milliseconds) as needed
    });

    // Add a click event listener to the resume button
    mainMenuButton.addEventListener("click", function () {
        // Fade out the body
        document.body.style.opacity = 0;

        // After a delay, navigate to the Dummy Game UI.html page
        setTimeout(function () {
            window.location.href = "../../home-settings/home-page.php";
        }, 500); // Adjust the delay (in milliseconds) as needed
    });
});