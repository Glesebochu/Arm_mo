<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="styles/Game UI.css" />
    <script src="https://code.iconify.design/2/2.0.3/iconify.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="scripts/Game UI.js" defer></script>
    <link rel="icon" href="Icons/Arm-mo Title Icon 2.png" type="image/x-icon">
    <title>Arm'mo</title>
</head>
<body>
    <div class="portrait-div">
        <p class="portrait-text">change the orientation of your display to landscape mode</p>
        <img src="Icons/Rotate Phone.svg" class="portrait-icon">
    </div>

    <div class="inner-container">
        <!-- <iframe src="./Side-Panel/sidePanel.html" frameborder="0" class="side-panel"></iframe> -->
        <div class="side-panel">
            <div class="stage">
                <button class="stage-button"><p class="stage-number">1</p></button>
            </div>
            <div class="timer">
                <button class="timer-button"><img class="timer-icon" src="Icons/Timer.svg"></button>
            </div>
            <div class="settings">
                <button class="settings-button"><img class="settings-icon" src="Icons/Pause 3.svg"></button>
            </div>
            <div class="how-to-play">
                <button class="how-to-play-button"><img class="how-to-play-icon" src="Icons/Question.svg"></button>
            </div>
        </div>

        <iframe src="./Main-Panel/preparation.php" frameborder="0" class="main-panel"></iframe>
    </div>

</body>