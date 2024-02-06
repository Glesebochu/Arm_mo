document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector(".visual-four-step-button");
    var div = document.querySelector(".visual-four-step-div");

    button.addEventListener("click", function () {
        // Toggle the "active" class on the div
        div.classList.toggle("active");
    });
});
// ------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector(".auditory-four-step-button");
    var div = document.querySelector(".auditory-four-step-div");

    button.addEventListener("click", function () {
        // Toggle the "active" class on the div
        div.classList.toggle("active");
    });
});
// ------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector(".kinematics-four-step-button");
    var div = document.querySelector(".kinematics-four-step-div");

    button.addEventListener("click", function () {
        // Toggle the "active" class on the div
        div.classList.toggle("active");
    });
});
// ------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector(".taste-four-step-button");
    var div = document.querySelector(".taste-four-step-div");

    button.addEventListener("click", function () {
        // Toggle the "active" class on the div
        div.classList.toggle("active");
    });
});
// ------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector(".olifactory-four-step-button");
    var div = document.querySelector(".olifactory-four-step-div");

    button.addEventListener("click", function () {
        // Toggle the "active" class on the div
        div.classList.toggle("active");
    });
});
// ------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector(".feeling-four-step-button");
    var div = document.querySelector(".feeling-four-step-div");

    button.addEventListener("click", function () {
        // Toggle the "active" class on the div
        div.classList.toggle("active");
    });
});
// ------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
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
});
// ------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector(".thought-four-step-button");
    var div = document.querySelector(".thought-four-step-div");

    button.addEventListener("click", function () {
        // Toggle the "active" class on the div
        div.classList.toggle("active");
    });
});
// ------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector(".emotional-four-step-button");
    var div = document.querySelector(".emotional-four-step-div");

    button.addEventListener("click", function () {
        // Toggle the "active" class on the div
        div.classList.toggle("active");
    });
});