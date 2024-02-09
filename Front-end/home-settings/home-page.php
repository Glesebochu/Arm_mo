<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <link rel="icon" href="/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <title>Home Page</title>
  <link href=".././Font.css"/>
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
    ?>

    <script type="module">
      // Import the Meditator.js module
      import { Meditator } from '../../Middle-logic/Models/Meditator.js';

      // Output the JavaScript code to create the Meditator object
      var meditatorObj = JSON.parse('<?php echo $javascriptMeditator; ?>');
      
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

    <!-- NEW Stage Object Retreival test -->
    <?php
      // Include the PHP file with the Stage class definition
      include_once '../../Back-end/Models/Stage.php';
      $javascriptStage = Stage::getJavaScriptStage(1);
    ?>
    <script type="module">
      // Import the ObservableObject.js module
      import { Stage } from '../../Middle-logic/Models/Stage.js';
      
      // Output the JavaScript code to create the Step objects
      var stage = <?php echo $javascriptStage;?>;
      console.log('NEW', Stage.getStageFromObject(stage));
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
      console.log('NEW', Session.getSessionFromObject(session));
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
        obj.Label += 'boop';
        return obj;
      });
      console.log('check', ahaMomentObjects)
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