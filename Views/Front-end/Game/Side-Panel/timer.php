<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../styles/timer.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap" rel="stylesheet">
    
    <link rel="icon" href="../Icons/Arm-mo Title Icon 2.png" type="image/x-icon">
    <title>Arm'mo: Timer</title>

    <!-- Session Object Retreival -->
    <?php
      // Include the PHP file with the Session class definition
      include_once '../../../Back-end/Models/Session.php';
      session_start();
      $javascriptSession = Session::getJavaScriptSession($_SESSION['session']-1);
    ?>
    <script type="module">
      // Import the Session.js module
      import { Session } from '../../../Middle-logic/Models/Session.js';

      // Output the JavaScript code to create the Step objects
      var session = <?php echo $javascriptSession;?>;
      var sessionObject = Session.getSessionFromObject(session);
      var durationStep = sessionObject.Steps.filter(step => step.Title == "Duration")[0];
      var duration = parseInt(durationStep.Response);
      console.log(sessionObject);
      console.log(durationStep);
      console.log(duration);
      
      import { timeCountdown } from '../scripts/timer.js';
      timeCountdown(duration);
    </script>
    <script src="../scripts/timer.js" type="module"></script>
</head>
<body>
    <div class="portrait-div">
        <p class="portrait-text">change the orientation of your display to landscape mode</p>
        <img src="../Icons/Rotate Phone.svg" class="portrait-icon">
    </div>

    <div class="timer-inner-container">
        <div class="center-container">
            <div id="timer-container">
                <p id="timer">00:00:00</p>
            </div>
        </div>

        <!-- <button class="triangle-button" onclick="toggleSettings()"> -->
        <button class="triangle-button">
            <img class="close-icon" src="../Icons/Close.svg">
        </button>
    </div>
</body>
</html>