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