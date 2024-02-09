// function loadSecondPage() {
//     const secondPage = document.getElementById('secondPage');
//     secondPage.classList.toggle('active');

//     // Check if the second page is already loaded
//     if (!secondPage.innerHTML.trim()) {
//         // Load the content from another HTML document
//         const xhr = new XMLHttpRequest();
//         xhr.open('GET', '../Side-Panel/timer.php', true);
//         xhr.onreadystatechange = function () {
//             if (xhr.readyState == 4 && xhr.status == 200) {
//                 // Inject the loaded content into the second page
//                 secondPage.innerHTML = xhr.responseText;
//             }
//         };
//         xhr.send();
//     }
// }

// function loadSecondPage() {
//     const secondPage = document.getElementById('secondPage');
//     secondPage.classList.toggle('active');

//     // Test: Insert static content into the second page
//     secondPage.innerHTML = '<p>This is a test content.</p>';
// }

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