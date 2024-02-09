<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../styles/stageInformation.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../Font.css">
    <script src="../scripts/stageInformation.js" type="module"></script>
    <title>Arm-mo</title>

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

      import { displayStageInformation } from '../scripts/stageInformation.js';
      displayStageInformation(stage);
    </script>
</head>
<body>
    <div class="portrait-div">
        <p class="portrait-text">change the orientation of your display to landscape mode</p>
        <img src="../Icons/Rotate Phone.svg" class="portrait-icon">
    </div>

    <div class="container-wrapper">
        <div class="inner-container" id="stageInfoContainer">

        </div>

        <div class="page-button">
            <button class="previous-stage"><img src="../Icons/chevron-left.svg" alt="" class="previous-stage-icon"></button>
            <button class="stage-button">1</button>
            <button class="next-stage"><img src="../Icons/chevron-right.svg" alt="" class="next-stage-icon"></button>
        </div>
    </div>
</body>
</html>