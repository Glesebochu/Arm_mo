export function displayTransition() {
    var buttons = document.querySelectorAll('.feeling-state .unpleasant-button, .feeling-state .neutral-button, .feeling-state .pleasant-button');

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            if (button.classList.contains('active')) {
                return;
            }

            buttons.forEach(function(btn) {
                btn.classList.remove('active');
                btn.style.borderRadius = '50px';
                btn.style.transform = 'scale(1)';
            });

            button.classList.add('active');
            button.style.borderRadius = '5px';
            button.style.transform = 'scaleX(2.8)';
        });
    });

    function setupToggleButton(buttonClass, divClass) {
        var button = document.querySelector(buttonClass);
        var div = document.querySelector(divClass);

        button.addEventListener("click", function (event) {
            // Toggle the "active" class on the div
            div.classList.toggle("active");

            // Check if the div has the "active" class
            if (div.classList.contains("active")) {
                // Completely hide the button if the div is active
                button.style.display = "none";
            }

            // Stop the click event propagation to prevent it from reaching the document
            event.stopPropagation();
        });

        // Add click event listener to the document
        document.addEventListener("click", function () {
            // Check if the div has the "active" class
            if (div.classList.contains("active")) {
                // Remove the "active" class from the div
                div.classList.remove("active");

                // Ensure the button is visible again
                button.style.display = "none";
            }
        });
    }

    setupToggleButton(".visual-four-step-button", ".visual-four-step-div");
    setupToggleButton(".auditory-four-step-button", ".auditory-four-step-div");
    setupToggleButton(".kinesthetic-four-step-button", ".kinesthetic-four-step-div");
    setupToggleButton(".taste-four-step-button", ".taste-four-step-div");
    setupToggleButton(".olifactory-four-step-button", ".olifactory-four-step-div");
    setupToggleButton(".feeling-four-step-button", ".feeling-four-step-div");
    setupToggleButton(".thought-four-step-button", ".thought-four-step-div");
    setupToggleButton(".emotional-four-step-button", ".emotional-four-step-div");

    function setupStimulusButton(buttonClass, inputDivClass, populateStimulusClass) {
        var button = document.querySelector(buttonClass);
        var inputDiv = document.querySelector(inputDivClass);
        var populateStimulus = document.querySelector(populateStimulusClass);

        var clickCounter = 0;
        var spacingBetweenElements = 1; // Set your desired spacing in vmax

        button.addEventListener("click", function () {
            clickCounter++;

            button.classList.toggle("active");
            inputDiv.classList.toggle("active");
            inputDiv.classList.toggle("inactive", !button.classList.contains("active"));

            if (clickCounter % 2 === 0) {
                var textareaInput = document.querySelector(inputDivClass + " textarea").value;

                var inputArray = textareaInput.split(' ');

                populateStimulus.innerHTML = '';

                if (inputArray.length > 0 && inputArray[0].trim() !== "") {

                    inputArray.forEach(function (inputElement) {
                        var newParagraph = document.createElement("p");
                        newParagraph.textContent = inputElement;

                        populateStimulus.appendChild(newParagraph);
                    });
                }
            }
        });
    }

    setupStimulusButton(".visual-stimulus-button", ".visual-stimulus-input-div", ".populate-visual-stimulus");
    setupStimulusButton(".auditory-stimulus-button", ".auditory-stimulus-input-div", ".populate-auditory-stimulus");
    setupStimulusButton(".kinesthetic-stimulus-button", ".kinesthetic-stimulus-input-div", ".populate-kinesthetic-stimulus");
    setupStimulusButton(".taste-stimulus-button", ".taste-stimulus-input-div", ".populate-taste-stimulus");
    setupStimulusButton(".olifactory-stimulus-button", ".olifactory-stimulus-input-div", ".populate-olifactory-stimulus");
    setupStimulusButton(".thought-state-button", ".thought-state-input-div", ".populate-thought-state");
    setupStimulusButton(".emotional-state-button", ".emotional-state-input-div", ".populate-emotional-state");

    // Get references to the aha-moment button and counter elements
    const ahaButton = document.querySelector('.aha-moment');
    const counterElement = document.getElementById('counter');

    // Initialize the counter value
    let counterValue = 0;

    // Function to update the counter content
    const updateCounter = () => {
        counterElement.textContent = counterValue;
    };

    // Event listener for the aha-moment button
    ahaButton.addEventListener('click', () => {
        // Increment the counter value
        counterValue++;

        // Update the counter content
        updateCounter();
    });

    // Initial setup
    updateCounter();
}

document.addEventListener("DOMContentLoaded", displayTransition);

// #region Original and Incomplete codes



// FINAL ATTEMPT FOR THE FOUR STEP BUTTONS FOR A SINGULAR ELEMENT
// document.addEventListener("DOMContentLoaded", function () {
//     var button = document.querySelector(".visual-four-step-button");
//     var div = document.querySelector(".visual-four-step-div");

//     button.addEventListener("click", function (event) {
//         // Toggle the "active" class on the div
//         div.classList.toggle("active");

//         // Completely hide the button
//         button.style.display = "none";

//         // Stop the click event propagation to prevent it from reaching the document
//         event.stopPropagation();
//     });

//     // Add click event listener to the document
//     document.addEventListener("click", function () {
//         // Remove the "active" class from the div
//         div.classList.remove("active");

//         // Ensure the button is visible again
//         button.style.display = "none";
//     });
// });



// FIRST ATTEMPT FOR THE FOUR STEP BUTTONS
// document.addEventListener("DOMContentLoaded", function () {
//     var button = document.querySelector(".taste-four-step-button");
//     var div = document.querySelector(".taste-four-step-div");

//     button.addEventListener("click", function () {
//         // Toggle the "active" class on the div
//         div.classList.toggle("active");
//     });
// });



// ATTEMPT TO DISPLAY THE ICONS OF THE USER'S INPUTS
// document.addEventListener("DOMContentLoaded", function () {
//     var button = document.querySelector(".visual-stimulus-button");
//     var inputDiv = document.querySelector(".visual-stimulus-input-div");
//     var populateAuditoryStimulus = document.querySelector(".populate-visual-stimulus");

//     // Counter variable to track button clicks
//     var clickCounter = 0;

//     button.addEventListener("click", function () {
//         // Increment the counter on each button click
//         clickCounter++;

//         // Toggle the "active" class on the inputDiv
//         button.classList.toggle("active");
//         inputDiv.classList.toggle("active");

//         // Toggle the "inactive" class to control pointer events
//         inputDiv.classList.toggle("inactive", !button.classList.contains("active"));

//         // Check if the click is even
//         if (clickCounter % 2 === 0) {
//             // Show a confirmation alert with a slight delay
//             setTimeout(function () {
//                 alert("Inputs stored successfully!");
//             }, 100);
//         }
//     });

//     button.addEventListener("click", async function () {
//         // Check if the click is even
//         if (clickCounter % 2 === 0) {
//             // Get the textarea input
//             var textareaInput = document.querySelector(".visual-stimulus-input").value;

//             // Split the input into an array using space as a delimiter
//             var inputArray = textareaInput.split(' ');

//             // Clear previous icons
//             populateVisualStimulus.innerHTML = '';

//             // Fetch and display icons from FontAwesome for each search query
//             for (const query of inputArray) {
//                 try {
//                     const iconElement = document.createElement("i");
//                     // Use Unicode directly in the content attribute
//                     iconElement.textContent = String.fromCharCode(parseInt(query, 16));
//                     populateVisualStimulus.appendChild(iconElement);
//                 } catch (error) {
//                     console.error(`Error fetching icon for query ${query}:`, error);
//                 }
//             }
//         }
//     });
// });


// RANDOM POSITION, FONT SIZE AND OPACITY FOR THE DISPLAYED INPUTS
// function setupStimulusButton(buttonClass, inputDivClass, populateStimulusClass) {
//     var button = document.querySelector(buttonClass);
//     var inputDiv = document.querySelector(inputDivClass);
//     var populateStimulus = document.querySelector(populateStimulusClass);

//     var clickCounter = 0;

//     button.addEventListener("click", function () {
//         clickCounter++;

//         button.classList.toggle("active");
//         inputDiv.classList.toggle("active");
//         inputDiv.classList.toggle("inactive", !button.classList.contains("active"));

//         if (clickCounter % 2 === 0) {
//             var textareaInput = document.querySelector(inputDivClass + " textarea").value;

//             var inputArray = textareaInput.split(' ');

//             populateStimulus.innerHTML = '';

//             if (inputArray.length > 0 && inputArray[0].trim() !== "") {
//                 inputArray.forEach(function (inputElement) {
//                     var newParagraph = document.createElement("p");
//                     newParagraph.textContent = inputElement;

//                     var maxX = populateStimulus.clientWidth - newParagraph.clientWidth;
//                     var maxY = populateStimulus.clientHeight - newParagraph.clientHeight;

//                     var randomPositionX = Math.floor(Math.random() * maxX);
//                     var randomPositionY = Math.floor(Math.random() * maxY);

//                     var randomFontSize = Math.floor(Math.random() * 10) + 10;
//                     var randomOpacity = Math.random() * 0.5 + 0.5;

//                     newParagraph.style.position = "absolute";
//                     newParagraph.style.left = randomPositionX + "px";
//                     newParagraph.style.top = randomPositionY + "px";
//                     newParagraph.style.fontSize = randomFontSize + "px";
//                     newParagraph.style.opacity = randomOpacity;

//                     populateStimulus.appendChild(newParagraph);
//                 });
//             }
//         }
//     });
// }

// document.addEventListener("DOMContentLoaded", function () {
//     setupStimulusButton(".visual-stimulus-button", ".visual-stimulus-input-div", ".populate-visual-stimulus");
//     setupStimulusButton(".auditory-stimulus-button", ".auditory-stimulus-input-div", ".populate-auditory-stimulus");
//     setupStimulusButton(".kinesthetic-stimulus-button", ".kinesthetic-stimulus-input-div", ".populate-kinesthetic-stimulus");
//     setupStimulusButton(".taste-stimulus-button", ".taste-stimulus-input-div", ".populate-taste-stimulus");
//     setupStimulusButton(".olifactory-stimulus-button", ".olifactory-stimulus-input-div", ".populate-olifactory-stimulus");
//     setupStimulusButton(".thought-state-button", ".thought-state-input-div", ".populate-thought-state");
//     setupStimulusButton(".emotional-state-button", ".emotional-state-input-div", ".populate-emotional-state");
// });



// #endregion