
document.addEventListener("DOMContentLoaded", function () {
    // Get the timer button
    var timerButton = document.querySelector(".timer-button");

    // Add a click event listener to the timer button
    // Add a click event listener to the timer button
    timerButton.addEventListener("click", function () {
        // Fade out the body
        document.body.style.opacity = 0;

        // After a delay, navigate to the timer.php page
        setTimeout(function () {
            window.location.href = "timer.php";
        }, 5000); // Adjust the delay (in milliseconds) as needed
    });
});