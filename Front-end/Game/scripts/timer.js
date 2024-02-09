// import { Session } from "../../../Middle-logic/Models/Session.js";

document.addEventListener("DOMContentLoaded", function () {
    const timerElement = document.getElementById("timer");

    // Example session start time
    const sessionStartTime = new Date();

    setInterval(() => {
        const currentTime = new Date();
        const elapsedTime = currentTime - sessionStartTime;

        const minutes = Math.floor(elapsedTime / (60 * 1000));
        const seconds = Math.floor((elapsedTime % (60 * 1000)) / 1000);
        const milliseconds = elapsedTime % 1000; // Changed to milliseconds

        const formattedTime = `${padZero(minutes)}:${padZero(seconds)}:${padZero(milliseconds, 3)}`;
        timerElement.textContent = formattedTime;
    }, 1); // Update every millisecond

    function padZero(num, length = 2) {
        return num.toString().padStart(length, '0');
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Get the triangle button
    var triangleButton = document.querySelector(".triangle-button");

    // Add a click event listener to the triangle button
    triangleButton.addEventListener("click", function () {
        // Fade out the body
        document.body.style.opacity = 0;

        // After a delay, navigate to the Dummy Game UI.html page
        setTimeout(function () {
            window.location.href = "../Game UI.html";
        }, 500); // Adjust the delay (in milliseconds) as needed
    });
});