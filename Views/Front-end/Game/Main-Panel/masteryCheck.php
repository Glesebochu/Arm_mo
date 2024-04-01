<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../Icons/Arm-mo Title Icon 2.png" type="image/x-icon">
    <title>Arm'mo</title>
    <link rel="stylesheet" href="../styles/general-styles.css">
    <link rel="stylesheet" href="../styles/masteryCheck.css">
    <link rel="stylesheet" href="../../Font.css"/>

    <!-- Stage Object Retrieval -->
    <?php
      // Include the PHP files with the function to retrieve the Stage object
      include_once '../../../Back-end/Models/Stage.php';
      session_start();
      $identifier = $_SESSION['stage'];

      // Call the function to get the JavaScript stage object
      $javascriptStage = Stage::getJavaScriptStage($identifier);
    ?>

    <!-- Session Object Retreival test -->
    <?php
      // Include the PHP file with the function to retrieve the Session object
      include_once '../../../Back-end/Models/Session.php';
      $identifier = $_SESSION['session'];

      // Call the function to get the JavaScript Session array
      $javascriptSession = Session::getJavaScriptSession($identifier);
    ?>

    <script type="module">
      // --------------------------------------------------------------------------
      // Output the JavaScript code to create the Stage object
      import { Stage } from '../../../Middle-logic/Models/Stage.js';
      var obj = <?php echo $javascriptStage; ?>;
      var stageObj = Stage.getStageFromObject(obj);
      
      // --------------------------------------------------------------------------
      // Output the JavaScript code to create the Session objects
      import { Session } from '../../../Middle-logic/Models/Session.js';
      var obj = <?php echo $javascriptSession;?>;
      var sessionObj = Session.getSessionFromObject(obj);

      // Call the masteryCheck function
      import { masteryCheck } from '../scripts/masteryCheck.js';
      masteryCheck(sessionObj, stageObj);
    </script>


</head>
<body>
    <form action="" id="masteryCheck-form">
        <h2 id="masteryCheck-title">Which of the following accurately describes this meditation session?</h2>
        <div id="masteryCheck-requirements">
            <!-- <div class="masteryCheck-input-label-pair">
                <input type="checkbox" name="masteryRequirement1" class="masteryCheck-checkbox">
                <label for="masteryRequirement1">Mastery Requirement 1</label>
            </div> -->
        </div>
        <input type="button" value="Next" class="masteryCheck-button" id="masteryCheck-nextButton">
    </form>
    
    <div id="congrats-message">
        <h2>Congrats! You just mastered this stage.</h2>
        <input type="button" value="I'm glad." class="masteryCheck-button" id="masteryCheck-gladButton">
    </div>
    
</body>
</html>
<script src="../scripts/masteryCheck.js" type="module"></script>