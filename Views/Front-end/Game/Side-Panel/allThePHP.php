<!-- For stageInformation.php -->

    <!-- Stage Object Retreival -->
    <?php
      // Include the PHP file with the Stage class definition
      include_once '../../Back-end/Models/Stage.php';
      $javascriptStage = Stage::getJavaScriptStage($_SESSION['stage']);
    ?>
    <script type="module">
      // Import the ObservableObject.js module
      import { Stage } from '../../Middle-logic/Models/Stage.js';
      
      // Output the JavaScript code to create the Step objects
      var obj = <?php echo $javascriptStage;?>;
      var stage = Stage.getStageFromObject(obj);
      console.log(stage);

      import { functionName } from '../scripts/stageInformation.js';
      functionName(stage);
    </script>

<!-- For timer.php -->

    <!-- Session Object Retreival -->
    <?php
      // Include the PHP file with the Session class definition
      include_once '../../Back-end/Models/Session.php';
      $javascriptSession = Session::getJavaScriptSession($_SESSION['session']);
    ?>
    <script type="module">
      // Import the Session.js module
      import { Session } from '../../Middle-logic/Models/Session.js';

      // Output the JavaScript code to create the Step objects
      var session = <?php echo $javascriptSession;?>;
      var sessionObject = Session.getSessionFromObject(session);
      var durationStep = sessionObject.Steps.filter(step => step.Title == "Duration");
      var duration = parseInt(durationStep.Response);
      console.log(sessionObject);
      console.log(durationStep);
      
      import { functionName } from '../scripts/timer.js';
      functionName(duration);
    </script>

<!-- For transition.php -->
    <!-- Session Object Retreival -->
    <?php
      // Include the PHP file with the Session class definition
      include_once '../../Back-end/Models/Session.php';
      $javascriptSession = Session::getJavaScriptSession($_SESSION['session']);
    ?>
    <!-- Stage Object Retreival -->
    <?php
      // Include the PHP file with the Stage class definition
      include_once '../../Back-end/Models/Stage.php';
      $javascriptStage = Stage::getJavaScriptStage($_SESSION['stage']);
    ?>
    <script type="module">
      // Import the ObservableObject.js module
      import { Stage } from '../../Middle-logic/Models/Stage.js';
      
      // Output the JavaScript code to create the Step objects
      var obj = <?php echo $javascriptStage;?>;
      var stage = Stage.getStageFromObject(obj);
      console.log(stage);

      // Import the Session.js module
      import { Session } from '../../Middle-logic/Models/Session.js';

      // Output the JavaScript code to create the Step objects
      var session = <?php echo $javascriptSession;?>;
      var sessionObject = Session.getSessionFromObject(session);
      console.log(sessionObject);
      
      import { functionName } from '../scripts/transition.js';
      functionName(session, stage);
    </script>

