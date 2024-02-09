<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mastery Check</title>
    <link rel="stylesheet" href="../styles/general-styles.css">
    <link rel="stylesheet" href="../styles/masteryCheck.css">
    <link rel="stylesheet" href="../../Font.css"/>

    <!-- Meditator Object Retreival test -->
    <?php
      // Include the PHP file with the function to retrieve the Meditator object
      include_once '../../../Back-end/Models/Meditator.php';
    //   $identifier = $_SESSION['UsernametoEdit'];
      $javascriptMeditator = Meditator::getJavaScriptMeditator('FinhasGustavo@gmail.com');

    ?>

    <!-- Stage Object Retrieval -->
    <?php
      // Include the PHP files with the function to retrieve the Stage object
      include_once '../../../Back-end/Models/Stage.php';
      include_once '../../../Back-end/Models/Skill.php';
      include_once '../../../Back-end/Models/Intention.php';
      include_once '../../../Back-end/Models/MasteryRequirement.php';
      include_once '../../../Back-end/Models/Obstacle.php';

      // $identifier = $_SESSION['stage'];
      $identifier = 2;

      // Call the function to get the JavaScript stage object
      $javascriptStage = Stage::getJavaScriptStage($identifier);

      // Retrieve the skills, intentions, and obstacles for the specific stage
      $skills = Skill::getJavaScriptSkillArray($identifier);
      $intention = Intention::getJavaScriptIntentionArray($identifier);
      $masteryRequirement = MasteryRequirement::getJavaScriptMasteryRequirementArray($identifier);
      $obstacles = Obstacle::getJavaScriptObstacleArray($identifier);
    ?>

    <!-- Session Object Retreival test -->
    <?php
      // Include the PHP file with the function to retrieve the Session object
      include_once '../../../Back-end/Models/Session.php';
      include_once '../../../Back-end/Models/Step.php';

      //$identifier = $_SESSION['session'];
      $stepArray = Step::getStepArray(1);
      $javascriptStepArray = json_encode($stepArray);
      // Call the function to get the JavaScript Session array
      $javascriptSession = Session::getJavaScriptSession(1);
    ?>
    <script type="module">
      // Import the Meditator.js module
      import { Meditator } from '../../../Middle-logic/Models/Meditator.js';

      // Output the JavaScript code to create the Meditator object
      var obj = JSON.parse('<?php echo $javascriptMeditator; ?>');
      
      var meditatorObj=Meditator.getMeditatorFromObject(obj);

      // --------------------------------------------------------------------------

      // Import the Step.js module
      import { Step } from '../../../Middle-logic/Models/Step.js';
      var stepArray = <?php echo $javascriptStepArray ?>;
     
      // Convert the stepArray to Step objects
      var stepObjects = Step.getStepsFromArrayObject(stepArray);

      // Import the Session.js module
      import { Session } from '../../../Middle-logic/Models/Session.js';

      // Output the JavaScript code to create the Session objects
      var obj = <?php echo $javascriptSession;?>;
      var sessionObj = Session.getSessionFromObject(obj);
      sessionObj.Steps = stepObjects;
      sessionObj.Meditator = meditatorObj;

    //   console.log(sessionObj);

      // --------------------------------------------------------------------------

      // Import the necessary modules
      import { Stage } from '../../../Middle-logic/Models/Stage.js';
      import { Skill } from '../../../Middle-logic/Models/Skill.js';
      import { Intention } from '../../../Middle-logic/Models/Intention.js';
      import { MasteryRequirement } from '../../../Middle-logic/Models/MasteryRequirement.js';
      import { Obstacle } from '../../../Middle-logic/Models/Obstacle.js';

      // Output the JavaScript code to create the Stage object
      var obj = JSON.parse('<?php echo $javascriptStage; ?>');
      // Create an array of skill objects
      var skillsArray = <?php echo json_encode($skills); ?>;
      var skillObjects = skillsArray.map(skillJson => JSON.parse(skillJson));
      skillObjects=Skill.getSkillsFromArrayObject(skillObjects)

      // Return the intention object
      var intentionObj = JSON.parse('<?php echo $intention; ?>');
      intentionObj=Intention.getIntentionsFromArrayObjects(intentionObj)

      // Return the Mastery Requirement object
      var masteryRequirement = JSON.parse('<?php echo $masteryRequirement; ?>');
      masteryRequirement=MasteryRequirement.getMasteryRequirementFromArray(masteryRequirement)

      // Create an array of obstacle objects
      var obstaclesArray = <?php echo json_encode($obstacles); ?>;
      var obstacleObjects = obstaclesArray.map(obstacleJson => JSON.parse(obstacleJson));
      obstacleObjects= Obstacle.getObstaclesFromArrayObject(obstacleObjects)

      // Update the stage object with the retrieved skills, intentions, and obstacles
      obj.Skills = skillObjects;
      obj.Intentions = intentionObj;
      obj.Obstacles = obstacleObjects;
      obj.MasteryRequirements=masteryRequirement;

      var stageObj = Stage.getStageFromObject(obj);

    //   console.log(obj);
    //   console.log(stageObj);

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