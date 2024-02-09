// function loadSecondPage() {
//     const secondPage = document.getElementById('secondPage');
//     secondPage.classList.toggle('active');

//     // Check if the second page is already loaded
//     if (!secondPage.innerHTML.trim()) {
//         // Load the content from another HTML document
//         const xhr = new XMLHttpRequest();
//         xhr.open('GET', '../Side-Panel/timer.html', true);
//         xhr.onreadystatechange = function () {
//             if (xhr.readyState == 4 && xhr.status == 200) {
//                 // Inject the loaded content into the second page
//                 secondPage.innerHTML = xhr.responseText;
//             }
//         };
//         xhr.send();
//     }
// }

function loadSecondPage() {
    const secondPage = document.getElementById('secondPage');
    secondPage.classList.toggle('active');

    // Test: Insert static content into the second page
    secondPage.innerHTML = '<p>This is a test content.</p>';
}