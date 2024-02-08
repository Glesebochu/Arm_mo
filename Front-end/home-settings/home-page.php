<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <link rel="icon" href="/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <title>Home Page</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Mako%3A400"/>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro%3A400"/>
  <link rel="stylesheet" href="./styles/home-page.css">
  
  <script>

    <?php session_start(); ?>
    var stageID = <?php echo isset($_SESSION['stage']) ? $_SESSION['stage'] : 1; ?>;
    // <!-- Include the Meditator.js file -->
  </script>
  <!-- Object Retrieval test zone -->
  
    <!-- Meditator Object Retreival test -->
    <?php
      // Include the PHP file with the function to retrieve the Meditator object
      include_once '../../Back-end/Models/Meditator.php';
      $identifier = $_SESSION['UsernametoEdit'];
      $javascriptMeditator = Meditator::getJavaScriptMeditator($identifier);
      // $javascriptMeditator2 = getJavaScriptMeditator('Zellalem@gmail.com');

    ?>

    <script type="module">
      // Import the Meditator.js module
      import { Meditator } from '../../Middle-logic/Models/Meditator.js';

      // Output the JavaScript code to create the Meditator object
      var meditatorObj = JSON.parse('<?php echo $javascriptMeditator; ?>');
      
      // var meditatorObj2 = JSON.parse('<?php // echo $javascriptMeditator2; ?>');

      console.log(meditatorObj);
      var meditator1=Meditator.getMeditatorFromObject(meditatorObj);
      console.log(meditator1);

    </script>

    <!-- Meditator Oject Sending test -->
    <script type="module">
      // Import the Meditator.js module
      import { Meditator } from '../../Middle-logic/Models/Meditator.js';

      // Create a sample Meditator object
      var meditatorTest = new Meditator('1', 'Finhas', 'Yohannes', 'FinhasGustavo@gmail.com', 'test', '5');

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
      $javascriptObstacleArray = Obstacle::getJavaScriptObstacleArray(2);
    ?>
        
    <script type="module">
      // Import the Obstacle.js module
      import { Obstacle } from '../../Middle-logic/Models/Obstacle.js';

      // Output the JavaScript code to create the Obstacle objects
      var obstacleArray = <?php echo json_encode($javascriptObstacleArray); ?>;
      
      // Parse each JSON string to create the JavaScript Obstacle objects
      var obstacleObjects = obstacleArray.map(obstacleJson => JSON.parse(obstacleJson));
      console.log(obstacleObjects);
      console.log(Obstacle.convertArrayToObstacleObjects(obstacleObjects));
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
      var SkillArray = <?php echo json_encode($javascriptSkillArray); ?>;
      
      // Parse each JSON string to create the JavaScript Skill objects
      var SkillObjects = SkillArray.map(SkillJson => JSON.parse(SkillJson));
      console.log(SkillObjects);
      console.log(Skill.convertArrayToSkillObjects(SkillObjects));
    </script>

    <!-- Stage Object Retrieval -->
    <?php
      // Include the PHP files with the function to retrieve the Stage object
      include_once '../../Back-end/Models/Stage.php';

      $identifier = $_SESSION['stage'];
      // $identifier = 2;


      // Call the function to get the JavaScript stage object
      $javascriptStage = Stage::getJavaScriptStage($identifier);

      // Retrieve the skills, intentions, and obstacles for the specific stage
      $skills = Skill::getJavaScriptSkillArray($identifier);
      $intention = Intention::getJavaScriptIntentionArray($identifier);
      $masteryRequirement = MasteryRequirement::getJavaScriptMasteryRequirementArray($identifier);
      $obstacles = Obstacle::getJavaScriptObstacleArray($identifier);
    ?>

    <script type="module">
      // Import the necessary modules
      import { Stage } from '../../Middle-logic/Models/Stage.js';
      import { Skill } from '../../Middle-logic/Models/Skill.js';
      import { Intention } from '../../Middle-logic/Models/Intention.js';
      import { MasteryRequirement } from '../../Middle-logic/Models/MasteryRequirement.js';

      import { Obstacle } from '../../Middle-logic/Models/Obstacle.js';

      // Output the JavaScript code to create the Stage object
      var stageObj = JSON.parse('<?php echo $javascriptStage; ?>');
      // Create an array of skill objects
      var skillsArray = <?php echo json_encode($skills); ?>;
      var skillObjects = skillsArray.map(skillJson => JSON.parse(skillJson));
      skillObjects=Skill.convertArrayToSkillObjects(skillObjects)

      // Return the intention object
      var intentionObj = JSON.parse('<?php echo $intention; ?>');
      intentionObj=Intention.getIntentionFromArray(intentionObj)

      // Return the Mastery Requirement object
      var masteryRequirement = JSON.parse('<?php echo $masteryRequirement; ?>');
      masteryRequirement=MasteryRequirement.getMasteryRequirementFromArray(masteryRequirement)

      // Create an array of obstacle objects
      var obstaclesArray = <?php echo json_encode($obstacles); ?>;
      var obstacleObjects = obstaclesArray.map(obstacleJson => JSON.parse(obstacleJson));
      obstacleObjects= Obstacle.convertArrayToObstacleObjects(obstacleObjects)

      // Update the stage object with the retrieved skills, intentions, and obstacles
      stageObj.Skills = skillObjects;
      stageObj.Intentions = intentionObj;
      stageObj.Obstacles = obstacleObjects;
      stageObj.MasteryRequirements=masteryRequirement;

      console.log(stageObj);
      console.log(Stage.getStageFromObject(stageObj));
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

    <!-- Session Object Retreival test -->
    <?php
      // Include the PHP file with the function to retrieve the Session object
      include_once '../../Back-end/Models/Session.php';

      //$identifier = $_SESSION['session'];
      $stepArray = Step::getStepArray(1);
      $javascriptStepArray = json_encode($stepArray);
      // Call the function to get the JavaScript Session array
      $javascriptSessionArray = Session::getJavaScriptSessionArray(1);
    ?>

    <script type="module">
      // Import the Step.js module
      import { Step } from '../../Middle-logic/Models/Step.js';
      var stepArray = <?php echo $javascriptStepArray ?>;
     
     // Convert the stepArray to Step objects
      var stepObjects = Step.convertArrayToStepObjects(stepArray);

      // Import the Session.js module
      import { Session } from '../../Middle-logic/Models/Session.js';

      // Output the JavaScript code to create the Session objects
      var sessionArray = <?php echo json_encode($javascriptSessionArray); ?>;
      // console.log(sessionArray);

      // Parse each JSON string to create the JavaScript Session objects
      var sessionObjects = sessionArray.map(sessionJson => JSON.parse(sessionJson));
      console.log(sessionObjects);


      // Iterate through session objects and add corresponding steps
      sessionObjects.forEach(session => {
        var matchingSteps = stepObjects.filter(step => step.Session_ID === session.Session_ID);
        session.Steps = matchingSteps;
      });
      sessionObjects=Session.convertArrayToSessionObjects(sessionObjects);


      console.log(sessionObjects);
    </script>

    <!-- ObservableObject Object Retreival test -->

    <!-- Single -->
    <!-- SensoryStimulus Object Retreival test -->
    <?php
      // Include the PHP file with the ObservableObject class definition
      include_once '../../Back-end/Models/SensoryStimulus.php';
      $javascriptSensoryStimulus = SensoryStimulus::getJavaScriptSensoryStimulus('1');
    ?>
    <script type="module">
      // Import the ObservableObject.js module
      import { SensoryStimulus } from '../../Middle-logic/Models/SensoryStimulus.js';
      
      // Output the JavaScript code to create the Step objects
      var sensoryStimulus = <?php echo $javascriptSensoryStimulus;?>;
      console.log(sensoryStimulus);
      console.log(SensoryStimulus.getSensoryStimulusFromObject(sensoryStimulus));
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
      
      // Output the JavaScript code to create the Step objects
      var mentalObject = <?php echo $javascriptMentalObject;?>;
      console.log(mentalObject);
      console.log(MentalObject.getMentalObjectFromObject(mentalObject));

      var mentalObjectArray = <?php echo $javascriptMentalObjectArray;?>;
      console.log(mentalObjectArray);
      console.log(MentalObject.convertArrayToMentalObjectObjects(mentalObjectArray));
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

    <!-- AhaMoment Object Retreival test -->
    <?php
      // Include the PHP file with the AhaMoment class definition
      include_once '../../Back-end/Models/AhaMoment.php';
      $javascriptAhaMoment = AhaMoment::getJavaScriptAhaMoment('1');
    ?>
    <script type="module">
      // Import the ObservableObject.js module
      import { AhaMoment } from '../../Middle-logic/Models/AhaMoment.js';
      
      // Output the JavaScript code to create the Step objects
      var ahaMoment = <?php echo $javascriptAhaMoment;?>;
      console.log(ahaMoment);
      console.log(AhaMoment.getAhaMomentFromObject(ahaMoment));
    </script>

    <!-- Antidote Object Retreival test -->
    <?php
      // Include the PHP file with the Antidote class definition
      include_once '../../Back-end/Models/Antidote.php';
      $javascriptAntidote = Antidote::getJavaScriptAntidote('1');
    ?>
    <script type="module">
      // Import the ObservableObject.js module
      import { Antidote } from '../../Middle-logic/Models/Antidote.js';
      
      // Output the JavaScript code to create the Step objects
      var antidote = <?php echo $javascriptAntidote;?>;
      console.log(antidote);
      console.log(Antidote.getAntidoteFromObject(antidote));
    </script>

  <script>
    function openPage(link){
      window.open(link,'_self');
    }
  </script>
    
  <script>
    function selectStage(stage) {
      var wrapper = document.getElementsByClassName('pizzaPieces');
      var wrapperItems = wrapper[0].children;

      var textWrapper=document.getElementsByClassName('stageTexts');
      var textItems = textWrapper[0].children;

      for(item of wrapperItems) {
        item.classList.remove('selectStage');
      }

      for(item of textItems) {
        item.classList.remove('selectStageItem');
      }
      var clickedStage = document.getElementsByClassName(stage);
      clickedStage[0].classList.add('selectStage')

      var clickedStageText = document.getElementsByClassName('Stage'+stage.slice(1)+'Text');
      clickedStageText[0].classList.add('selectStageItem');
    }
    function shadeEllipses(stage) {
      var ellipseParent = document.getElementsByClassName('ellipses');
      var ellipses = ellipseParent[0].children;
      var counter = 0;
      
      console.log(stageID);
      
      if (stageID < stage) {
        stage=stageID;
        selectStage('s'+stage);
        while (counter < stage - 1) {
          ellipses[counter].classList.add('ellipseShade');
          counter++;
        }
        while (stage <= 9) {
          ellipses[stage - 1].classList.remove('ellipseShade');
          stage++;
        }
      } else {
        selectStage('s'+stage);
        while (counter < stage - 1) {
          ellipses[counter].classList.add('ellipseShade');
          counter++;
        }
        while (stage <= 9) {
          ellipses[stage - 1].classList.remove('ellipseShade');
          stage++;
        }
      }
    }

  </script>
  
</head>

<body>
  <main class="WrapperMain">

    <nav class="navigation">
      <img class="AboutUsIcon" onclick="openPage('../Aboutus/aboutus.html')" src="./assets/el-group.png"/>
      <img class="appname-ApT" src="./assets/appname.png"/>
      <img class="SettingsPageIcon" onclick="openPage('./settings-page.php')" src="./assets/vector.png"/>
    </nav>
    
    <section class="centerPortion">

      <section class="ellipses">
        <img class="ellipse-1" src="./assets/ellipse-1-dvK.png"/>
        <img class="ellipse-2" src="./assets/ellipse-2.png"/>
        <img class="ellipse-3" src="./assets/ellipse-3.png"/>
        <img class="ellipse-4" src="./assets/ellipse-4.png"/>
        <img class="ellipse-5" src="./assets/ellipse-5-Fas.png"/>
        <img class="ellipse-6" src="./assets/ellipse-6-sbq.png"/>
        <img class="ellipse-7" src="./assets/ellipse-7-TsR.png"/>
        <img class="ellipse-8" src="./assets/ellipse-8.png"/>
        <img class="ellipse-9" src="./assets/ellipse-9.png"/>
      </section>

      <section class="MeditationStageWrapper">

        <section class="pizzaPieces">
          <img class="stage-10 s10" src="./assets/stage-10.png"/>
          <img class="stage-9 s9" src="./assets/stage-9.png"/>
          <img class="stage-8 s8" src="./assets/stage-8.png"/>
          <img class="stage-7 s7" src="./assets/stage-7.png"/>
          <img class="stage-6 s6" src="./assets/stage-6.png"/>
          <img class="stage-5 s5" src="./assets/stage-5.png"/>
          <img class="stage-4 s4" src="./assets/stage-4.png"/>
          <img class="stage-3 s3" src="./assets/stage-3.png"/>
          <img class="stage-2 s2" src="./assets/stage-2.png"/>
          <img class="stage-1 s1" src="./assets/output-onlinepngtools.png"/>
        </section>

        <section class="stageTexts">
          <p class="Stage10Text" onclick="shadeEllipses(10)">10</p>
          <p class="Stage9Text" onclick="shadeEllipses(9)">9</p>
          <p class="Stage8Text" onclick="shadeEllipses(8)">8</p>
          <p class="Stage7Text" onclick="shadeEllipses(7)">7</p>
          <p class="Stage6Text" onclick="shadeEllipses(6)">6</p>
          <p class="Stage5Text" onclick="shadeEllipses(5)">5</p>
          <p class="Stage4Text" onclick="shadeEllipses(4)">4</p>
          <p class="Stage3Text" onclick="shadeEllipses(3)">3</p>
          <p class="Stage2Text" onclick="shadeEllipses(2)">2</p>
          <p class="Stage1Text" onclick="shadeEllipses(1)">1</p>
        </section>

      </section>

    </section>

    <fotter id="copyright">
      <p>Copyright © ግለሠቦቹ 2021-2024</p>
    </fotter>

  </main>
</body>

</html>