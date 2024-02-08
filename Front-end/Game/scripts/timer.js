import { Session } from "../../../Middle-logic/Models/Session.js";

document.addEventListener("DOMContentLoaded", function () {
    const timerElement = document.getElementById("timer");

    // Example session start time
    const sessionStartTime = new Date();

    setInterval(() => {
        const currentTime = new Date();
        const elapsedTime = currentTime - sessionStartTime;

        const minutes = Math.floor(elapsedTime / (60 * 1000));
        const seconds = Math.floor((elapsedTime % (60 * 1000)) / 1000);
        const microseconds = elapsedTime % 1000;

        const formattedTime = `${padZero(minutes)}:${padZero(seconds)}:${padZeroMicro(microseconds)}`;
        timerElement.textContent = formattedTime;
    }, 1); // Update every millisecond

    function padZero(num) {
        return num.toString().padStart(2, '0');
    }

    function padZeroMicro(num) {
        return num.toString().padStart(3, '0');
    }
});