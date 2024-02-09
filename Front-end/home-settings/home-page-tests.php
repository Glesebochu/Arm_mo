<!-- Object Retrieval test zone -->
  
    <!-- Meditator Object Retreival test -->
    <?php
      // Include the PHP file with the function to retrieve the Meditator object
      include_once '../../Back-end/Models/Meditator.php';
      $identifier = $_SESSION['UsernametoEdit'];
      $javascriptMeditator = Meditator::getJavaScriptMeditator($identifier);
    ?>

    <script type="module">
      // Import the Meditator.js module
      import { Meditator } from '../../Middle-logic/Models/Meditator.js';

      // Output the JavaScript code to create the Meditator object
      var meditatorObj = JSON.parse('<?php echo $javascriptMeditator; ?>');
      
      console.log(meditatorObj);
      console.log(Meditator.getMeditatorFromObject(meditatorObj));

    </script>

    <!-- Meditator Oject Sending test -->
    <script type="module">
      // Import the Meditator.js module
      import { Meditator } from '../../Middle-logic/Models/Meditator.js';

      // Create a sample Meditator object
      var meditatorTest = new Meditator('1', 'Finhas', 'Yohannes', 'FinhasGustavo@gmail.com', 'test', '3');

      // Function to send the JavaScript object to the PHP script
      function updateMeditator(meditator) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '../../Back-end/UpdateDatabase/UpdateMeditator.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              console.log(xhr.responseText);
            } else {
              console.error('Error:', xhr.status);
            }
          }
        };
        
        var params = "meditator=" + encodeURIComponent(JSON.stringify(meditator));
        xhr.send(params);
      }

      // Call the updateMeditator function and pass the JavaScript object
      updateMeditator(meditatorTest);
    </script>

    <!-- Intention Object Retreival test -->
    <?php
      // Include the PHP file with the function to retrieve the Intention object
      include_once '../../Back-end/Models/Intention.php';
      $identifier = $_SESSION['stage'];
      $javascriptIntention = Intention::getJavaScriptIntentionArray($identifier);
  
    ?>

    <script type="module">
      // Import the Intention.js module
      import { Intention } from '../../Middle-logic/Models/Intention.js';

      // Output the JavaScript code to create the Intention object
      var intentionObj = JSON.parse('<?php echo $javascriptIntention; ?>');
      console.log(intentionObj);
      console.log(Intention.getIntentionFromArray(intentionObj));


    </script>

    <!-- MasteryRequirement Object Retreival test -->
    <?php
      // Include the PHP file with the function to retrieve the MasteryRequirement object
      include_once '../../Back-end/Models/MasteryRequirement.php';
      $identifier = $_SESSION['stage'];
      $javascriptMasteryRequirement = MasteryRequirement::getJavaScriptMasteryRequirementArray($identifier);
  
    ?>

    <script type="module">
      import { MasteryRequirement } from '../../Middle-logic/Models/MasteryRequirement.js';

      // Output the JavaScript code to create the MasteryRequirement object
      var MasteryRequirementObj = JSON.parse('<?php echo $javascriptMasteryRequirement; ?>');
      console.log(MasteryRequirementObj);
      var masteryRequirements = MasteryRequirement.getMasteryRequirementFromArray(MasteryRequirementObj);
      console.log(masteryRequirements);

    </script>

    <!-- Obstacle Object Retreival test -->
    <?php
      // Include the PHP file with the function to retrieve the Obstacle object
      include_once '../../Back-end/Models/Obstacle.php';
      
      $identifier = $_SESSION['stage'];
      
      // Call the function to get the JavaScript obstacle array
      $javascriptObstacleArray = Obstacle::getJavaScriptObstacleArray($identifier);
    ?>
        
    <script type="module">
      // Import the Obstacle.js module
      import { Obstacle } from '../../Middle-logic/Models/Obstacle.js';

      // Output the JavaScript code to create the Obstacle objects
      var obstacleArray = <?php echo $javascriptObstacleArray; ?>;
      
      // Parse each JSON string to create the JavaScript Obstacle objects
      // var obstacleObjects = obstacleArray.map(obstacleJson => JSON.parse(obstacleJson));
      // console.log(obstacleObjects);
      console.log(Obstacle.convertArrayToObstacleObjects(obstacleArray));
    </script>

    <!-- Skill Object Retreival test -->
    <?php
      // Include the PHP file with the function to retrieve the Skill object
      include_once '../../Back-end/Models/Skill.php';
      
      $identifier = $_SESSION['stage'];
      
      // Call the function to get the JavaScript Skill array
      $javascriptSkillArray = Skill::getJavaScriptSkillArray($identifier);
    ?>
        
    <script type="module">
      // Import the Skill.js module
      import { Skill } from '../../Middle-logic/Models/Skill.js';

      // Output the JavaScript code to create the Skill objects
      var SkillArray = <?php echo $javascriptSkillArray; ?>;
      
      // Parse each JSON string to create the JavaScript Skill objects
      // var SkillObjects = SkillArray.map(SkillJson => JSON.parse(SkillJson));
      // console.log(SkillObjects);
      console.log(Skill.convertArrayToSkillObjects(SkillArray));
    </script>

    <!-- Stage Object Retrieval -->
    <?php
      // // Include the PHP files with the function to retrieve the Stage object
      // include_once '../../Back-end/Models/Stage.php';

      // $identifier = $_SESSION['stage'];
      // // $identifier = 2;


      // // Call the function to get the JavaScript stage object
      // $javascriptStage = Stage::getJavaScriptStage($identifier);

      // // Retrieve the skills, intentions, and obstacles for the specific stage
      // $skills = Skill::getJavaScriptSkillArray($identifier);
      // $intention = Intention::getJavaScriptIntentionArray($identifier);
      // $masteryRequirement = MasteryRequirement::getJavaScriptMasteryRequirementArray($identifier);
      // $obstacles = Obstacle::getJavaScriptObstacleArray($identifier);
    ?>

    <script type="module">
      // // Import the necessary modules
      // import { Stage } from '../../Middle-logic/Models/Stage.js';
      // import { Skill } from '../../Middle-logic/Models/Skill.js';
      // import { Intention } from '../../Middle-logic/Models/Intention.js';
      // import { MasteryRequirement } from '../../Middle-logic/Models/MasteryRequirement.js';

      // import { Obstacle } from '../../Middle-logic/Models/Obstacle.js';

      // // Output the JavaScript code to create the Stage object
      // var stageObj = JSON.parse('<?php echo $javascriptStage; ?>');
      // // Create an array of skill objects
      // var skillsArray = <?php echo $skills; ?>;
      // var skillObjects = skillsArray.map(skillJson => JSON.parse(skillJson));
      // skillObjects=Skill.convertArrayToSkillObjects(skillObjects)

      // // Return the intention object
      // var intentionObj = JSON.parse('<?php echo $intention; ?>');
      // intentionObj=Intention.getIntentionFromArray(intentionObj)

      // // Return the Mastery Requirement object
      // var masteryRequirement = JSON.parse('<?php echo $masteryRequirement; ?>');
      // masteryRequirement=MasteryRequirement.getMasteryRequirementFromArray(masteryRequirement)

      // // Create an array of obstacle objects
      // var obstaclesArray = <?php echo json_encode($obstacles); ?>;
      // var obstacleObjects = obstaclesArray.map(obstacleJson => JSON.parse(obstacleJson));
      // obstacleObjects= Obstacle.convertArrayToObstacleObjects(obstacleObjects)

      // // Update the stage object with the retrieved skills, intentions, and obstacles
      // stageObj.Skills = skillObjects;
      // stageObj.Intentions = intentionObj;
      // stageObj.Obstacles = obstacleObjects;
      // stageObj.MasteryRequirements=masteryRequirement;

      // console.log(stageObj);
      // console.log(Stage.getStageFromObject(stageObj));
    </script>

    <!-- Step Object Retrieval test -->
    <?php
      // Include the PHP file with the Step class definition
      include_once '../../Back-end/Models/Step.php';
      // $sessionID = $_SESSION['session_id'];
      $stepArray = Step::getStepArray('1');
      $javascriptStepArray = json_encode($stepArray);
    ?>

    <script type="module">
      // Import the Step.js module
      import { Step } from '../../Middle-logic/Models/Step.js';

      // Output the JavaScript code to create the Step objects
      var stepArray = <?php echo $javascriptStepArray ?>;
      console.log(stepArray);
      // Convert the stepArray to Step objects
      var stepObjects = Step.convertArrayToStepObjects(stepArray);
      console.log(stepObjects);
    </script>

    <!-- ObservableObject Object Retreival test -->

    <!-- Single -->
    <!-- SensoryStimulus Object Retreival test -->
    <?php
      // Include the PHP file with the ObservableObject class definition
      include_once '../../Back-end/Models/SensoryStimulus.php';
      $javascriptSensoryStimulus = SensoryStimulus::getJavaScriptSensoryStimulus('1');
      $javascriptSensoryStimulusArray = SensoryStimulus::getJavaScriptSensoryStimulusArray('1');
    ?>
    <script type="module">
      // Import the ObservableObject.js module
      import { SensoryStimulus } from '../../Middle-logic/Models/SensoryStimulus.js';
      
      // Output the JavaScript code to create the SensoryStimulus objects
      var sensoryStimulus = <?php echo $javascriptSensoryStimulus;?>;
      console.log(sensoryStimulus);
      console.log(SensoryStimulus.getSensoryStimulusFromObject(sensoryStimulus));

      var sensoryStimulusArray = <?php echo $javascriptSensoryStimulusArray;?>;
      console.log(sensoryStimulusArray);
      console.log(SensoryStimulus.getSensoryStimuliFromArrayObject(sensoryStimulusArray));
    </script>
    
    <!-- MentalObject Object Retreival test -->
    <?php
      // Include the PHP file with the ObservableObject class definition
      include_once '../../Back-end/Models/MentalObject.php';
      $javascriptMentalObject = MentalObject::getJavaScriptMentalObject('2');
      $javascriptMentalObjectArray = MentalObject::getJavaScriptMentalObjectArray('1');
    ?>
    <script type="module">
      // Import the ObservableObject.js module
      import { MentalObject } from '../../Middle-logic/Models/MentalObject.js';
      
      // Output the JavaScript code to create the MentalObject objects
      var mentalObject = <?php echo $javascriptMentalObject;?>;
      console.log(mentalObject);
      console.log(MentalObject.getMentalObjectFromObject(mentalObject));

      var mentalObjectArray = <?php echo $javascriptMentalObjectArray;?>;
      console.log(mentalObjectArray);
      console.log(MentalObject.getMentalObjectsFromArrayObject(mentalObjectArray));
    </script>
    
    <!-- Activity Object Retreival test -->
    <?php
      // Include the PHP file with the Activity class definition
      include_once '../../Back-end/Models/Activity.php';
      $javascriptActivity = Activity::getJavaScriptActivity('1');
    ?>
    <script type="module">
      // Import the ObservableObject.js module
      import { Activity } from '../../Middle-logic/Models/Activity.js';
      
      // Output the JavaScript code to create the Step objects
      var activity = <?php echo $javascriptActivity;?>;
      console.log(activity);
      console.log(Activity.getActivityFromObject(activity));
    </script>

    <!-- NEW Session Object Retreival test -->
    <?php
      // Include the PHP file with the Session class definition
      include_once '../../Back-end/Models/Session.php';
      $javascriptSession = Session::getJavaScriptSession(1);
    ?>
    <script type="module">
      // Import the ObservableObject.js module
      import { Session } from '../../Middle-logic/Models/Session.js';
      
      // Output the JavaScript code to create the Step objects
      var session = <?php echo $javascriptSession;?>;
      console.log('NEW', session);
      console.log('NEW', Session.getSessionFromObject(session));
    </script>

    <!-- AhaMoment Object Retreival test -->
    <?php
      // Include the PHP file with the AhaMoment class definition
      include_once '../../Back-end/Models/AhaMoment.php';
      $javascriptAhaMoment = AhaMoment::getJavaScriptAhaMoment('1');
      $javascriptAhaMomentArray = AhaMoment::getJavaScriptAhaMomentArray('1');
    ?>
    <script type="module">
      // Import the ObservableObject.js module
      import { AhaMoment } from '../../Middle-logic/Models/AhaMoment.js';
      
      // Output the JavaScript code to create the Step objects
      var ahaMoment = <?php echo $javascriptAhaMoment;?>;
      console.log(ahaMoment);
      console.log(AhaMoment.getAhaMomentFromObject(ahaMoment));

      var ahaMomentArray = <?php echo $javascriptAhaMomentArray;?>;
      console.log(ahaMomentArray);
      console.log(AhaMoment.getAhaMomentsFromArrayObject(ahaMomentArray));
    </script>

    <!-- Antidote Object Retreival test -->
    <?php
      // Include the PHP file with the Antidote class definition
      include_once '../../Back-end/Models/Antidote.php';
      $javascriptAntidote = Antidote::getJavaScriptAntidote('1');
      $javascriptAntidoteArray = Antidote::getJavaScriptAntidoteArray(AntidoteType::Dullness);
    ?>
    <script type="module">
      // Import the ObservableObject.js module
      import { Antidote } from '../../Middle-logic/Models/Antidote.js';
      
      // Output the JavaScript code to create the Step objects
      var antidote = <?php echo $javascriptAntidote;?>;
      console.log(antidote);
      console.log(Antidote.getAntidoteFromObject(antidote));
      
      var antidoteArray = <?php echo $javascriptAntidoteArray;?>;
      console.log(antidoteArray);
      console.log(Antidote.getAntidotesFromArrayObject(antidoteArray));

    </script>

    <!-- Session Object Retreival test -->
    <?php
      // // Include the PHP file with the function to retrieve the Session object
      // include_once '../../Back-end/Models/Session.php';

      // //$identifier = $_SESSION['session'];
      // $stepArray = Step::getStepArray(1);
      // $javascriptStepArray = json_encode($stepArray);
      // // Call the function to get the JavaScript Session array
      // $javascriptSessionArray = Session::getJavaScriptSessionArray(1);
    ?>

    <script type="module">
      // // Import the Step.js module
      // // Import the Session.js module
      // import { Step } from '../../Middle-logic/Models/Step.js';
      // import { AhaMoment } from '../../Middle-logic/Models/AhaMoment.js';
      // import { Session } from '../../Middle-logic/Models/Session.js';

      // var stepArray = <?php echo $javascriptStepArray ?>;
      // // Convert the stepArray to Step objects
      // var stepObjects = Step.convertArrayToStepObjects(stepArray);

      // var ahaMomentArray = <?php echo $javascriptAhaMomentArray ?>;
      // var ahaMomentObjects=AhaMoment.getAhaMomentsFromArrayObject(ahaMomentArray);
      // console.log('test',ahaMomentObjects);


      // // Output the JavaScript code to create the Session objects
      // var sessionArray = <?php echo json_encode($javascriptSessionArray); ?>;
      // // console.log(sessionArray);

      // // Parse each JSON string to create the JavaScript Session objects
      // var sessionObjects = sessionArray.map(sessionJson => JSON.parse(sessionJson));
      // console.log(sessionObjects);


      // // Iterate through session objects and add corresponding steps
      // sessionObjects.forEach(session => {
      //   var matchingSteps = stepObjects.filter(step => step.Session_ID === session.Session_ID);
      //   session.Steps = matchingSteps;
      // });

      // // Iterate through session objects and add corresponding AhaMoment
      // sessionObjects.forEach(session => {
      //   var matchingAhaMoment = ahaMomentObjects.filter(AhaMoment => AhaMoment.Session_ID === session.Session_ID);
      //   session.AhaMoments = matchingAhaMoment;
      // });


      // sessionObjects=Session.convertArrayToSessionObjects(sessionObjects);


      // console.log(sessionObjects);
    </script>

    <!-- Session Object send test -->
    <script type="module">
      // Import the Session.js module
      import { Session } from '../../Middle-logic/Models/Session.js';
      import { Meditator } from '../../Middle-logic/Models/Meditator.js';
      import { Step } from '../../Middle-logic/Models/Step.js';
      import { AhaMoment } from '../../Middle-logic/Models/AhaMoment.js';


      // Function to send the Session object to the PHP script
      function updateSession(session) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '../../Back-end/UpdateDatabase/UpdateSession.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              console.log(xhr.responseText);
            } else {
              console.error('Error:', xhr.status);
            }
          }
        };

        var params = "session=" + encodeURIComponent(JSON.stringify(session));
        xhr.send(params);
      }
      function createSession(session) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '../../Back-end/UpdateDatabase/CreateSession.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              console.log(xhr.responseText);
            } else {
              console.error('Error:', xhr.status);
            }
          }
        };

        var params = "session=" + encodeURIComponent(JSON.stringify(session));
        xhr.send(params);
      }

      
      var meditatorTest = new Meditator('1', 'Finhas', 'Yohannes', 'FinhasGustavo@gmail.com', 'test', '5');

      var stepArray = <?php echo $javascriptStepArray ?>;
      var stepObjects = Step.convertArrayToStepObjects(stepArray);
      var matchingSteps = stepObjects.filter(step => step.Session_ID === '1');

      // Retrieve Aha Moments
      var ahaMomentArray = <?php echo $javascriptAhaMomentArray ?>;
      var ahaMomentObjects=AhaMoment.getAhaMomentsFromArrayObject(ahaMomentArray);
      ahaMomentObjects = ahaMomentObjects.map(obj => {
        obj.Label += ' test';
        return obj;
      });
      var matchingAhaMoments = ahaMomentObjects.filter(AhaMoment => AhaMoment.Session_ID === '1');

      var sessionData = {
        Start_Date_Time: '<?php echo date("Y-m-d H:i:s"); ?>',
        End_Date_Time: '<?php echo date("Y-m-d H:i:s"); ?>',
        Practiced_Stages: [1, 2, 3],
        Newly_Mastered_Stages: [7, 8, 9]
      };

      // Create a new Session object using the retrieved session data
      var sessionObject = new Session(
        '1',
        meditatorTest.Meditator_ID,
        sessionData.Start_Date_Time,
        sessionData.End_Date_Time,
        sessionData.Practiced_Stages,
        matchingAhaMoments,
        matchingSteps,
        sessionData.Newly_Mastered_Stages
      );
      console.log('test',sessionObject);

      // Call the updateSession function and pass the Session object
      updateSession(sessionObject);
    </script>

  