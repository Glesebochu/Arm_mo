<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="../styles/transition.css" />
    <link rel="icon" href="../Icons/Arm-mo Title Icon 2.png" type="image/x-icon">
    <title>Arm'mo</title>
    <script src="https://code.iconify.design/2/2.0.3/iconify.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    

    <!-- Session Object Retreival -->
    <?php
      session_start();
      // Include the PHP file with the Session class definition
      include_once '../../../Back-end/Models/Session.php';
      $javascriptSession = Session::getJavaScriptSession($_SESSION['session']-1);
    ?>
    <!-- Stage Object Retreival -->
    <?php
      // Include the PHP file with the Stage class definition
      include_once '../../../Back-end/Models/Stage.php';
      $javascriptStage = Stage::getJavaScriptStage($_SESSION['stage']);
    ?>
    <script type="module">
      // Import the ObservableObject.js module
      import { Stage } from '../../../Middle-logic/Models/Stage.js';
      
      // Output the JavaScript code to create the Step objects
      var obj = <?php echo $javascriptStage;?>;
      var stage = Stage.getStageFromObject(obj);
      console.log(stage);

      // Import the Session.js module
      import { Session } from '../../../Middle-logic/Models/Session.js';

      // Output the JavaScript code to create the Step objects
      var session = <?php echo $javascriptSession;?>;
      var sessionObject = Session.getSessionFromObject(session);
      console.log(sessionObject);
      
      import { displayTransition } from '../scripts/transition.js';
      displayTransition(sessionObject);
    </script>

    <script src="../scripts/transition.js" type="module"></script>

</head>
<body>

    <div class="main-panel">
        <div class="meditation-object">
            <p class="meditation-object-text">Meditation Object</p>
        </div>
        <!-- --------------------------------------------------------------------------------------------------------------- -->
        <!-- --------------------------------------------------------------------------------------------------------------- -->
        <!-- --------------------------------------------------------------------------------------------------------------- -->

        <div class="previous-stage">
            <button class="previous-stage-button"><img class="previous-stage-icon" src="../Icons/chevron-left.svg"></button>
        </div>
        <!-- --------------------------------------------------------------------------------------------------------------- -->
        <!-- --------------------------------------------------------------------------------------------------------------- -->
        <!-- --------------------------------------------------------------------------------------------------------------- -->

        <div class="sensory-stimulus">
            
            <div class="visual-stimulus">

                <button class="visual-four-step-button"></button>
                <div class="visual-four-step-div">
                    <p class="visual-four-step-heading">&nbsp;Heading</p>
                    <p class="visual-four-step-description">&nbsp; Description</p>
                </div>

                <div class="visual-stimulus-icon">
                    <img class="normal-image" src="../Icons/Visual Grey.svg" alt="Normal Image">
                    <img class="hover-image" src="../Icons/Visual.svg" alt="Hover Image">
                </div>

                <div class="populate-visual-stimulus"></div>

                <div class="visual-stimulus-input-div">
                    <textarea class="visual-stimulus-input" rows="4" cols="50" placeholder="Enter objects separated by space. Use only one noun to describe one object"></textarea>
                </div>

                <button class="visual-stimulus-button"><img class="add-visual-stimulus" src="../Icons/Plus.svg"></button>
                <label class="visual-stimulus-label"></label>
            </div>
            <!-- --------------------------------------------------------------------------------------------------------------- -->
            <!-- --------------------------------------------------------------------------------------------------------------- -->

            <div class="auditory-stimulus">

                <button class="auditory-four-step-button"></button>
                <div class="auditory-four-step-div">
                    <p class="auditory-four-step-heading">&nbsp;Heading</p>
                    <p class="auditory-four-step-description">&nbsp; Description</p>
                </div>

                <div class="auditory-stimulus-icon">
                    <img class="normal-image" src="../Icons/Auditory Grey.svg" alt="Normal Image">
                    <img class="hover-image" src="../Icons/Auditory.svg" alt="Hover Image">
                </div>
                
                <div class="populate-auditory-stimulus"></div>

                <div class="auditory-stimulus-input-div">
                    <textarea class="auditory-stimulus-input" rows="4" cols="50" placeholder="Enter objects separated by space. Use only one noun to describe one object"></textarea>
                </div>

                <button class="auditory-stimulus-button"><img class="add-auditory-stimulus" src="../Icons/Plus.svg"></button>
                <label class="auditory-stimulus-label"></label>
            </div>
            <!-- --------------------------------------------------------------------------------------------------------------- -->
            <!-- --------------------------------------------------------------------------------------------------------------- -->

            <div class="kinesthetic-stimulus">

                <button class="kinesthetic-four-step-button"></button>
                <div class="kinesthetic-four-step-div">
                    <p class="kinesthetic-four-step-heading">&nbsp;Heading</p>
                    <p class="kinesthetic-four-step-description">&nbsp; Description</p>
                </div>
                
                <div class="kinesthetic-stimulus-icon">
                    <img class="normal-image" src="../Icons/kinesthetic Grey.svg" alt="Normal Image">
                    <img class="hover-image" src="../Icons/kinesthetic.svg" alt="Hover Image">
                </div>

                <div class="populate-kinesthetic-stimulus"></div>

                <div class="kinesthetic-stimulus-input-div">
                    <textarea class="kinesthetic-stimulus-input" rows="4" cols="50" placeholder="Enter objects separated by space. Use only one noun to describe one object"></textarea>
                </div>

                <button class="kinesthetic-stimulus-button"><img class="add-kinesthetic-stimulus" src="../Icons/Plus.svg"></button>
                <label class="kinesthetic-stimulus-label"></label>
            </div>
            <!-- --------------------------------------------------------------------------------------------------------------- -->
            <!-- --------------------------------------------------------------------------------------------------------------- -->

            <div class="taste-stimulus">

                <button class="taste-four-step-button"></button>
                <div class="taste-four-step-div">
                    <p class="taste-four-step-heading">&nbsp;Heading</p>
                    <p class="taste-four-step-description">&nbsp; Description</p>
                </div>
                
                <div class="taste-stimulus-icon">
                    <img class="normal-image" src="../Icons/Taste Grey.svg" alt="Normal Image">
                    <img class="hover-image" src="../Icons/Taste.svg" alt="Hover Image">
                </div>
                
                <div class="populate-taste-stimulus"></div>

                <div class="taste-stimulus-input-div">
                    <textarea class="taste-stimulus-input" rows="4" cols="50" placeholder="Enter objects separated by space. Use only one noun to describe one object"></textarea>
                </div>

                <button class="taste-stimulus-button"><img class="add-taste-stimulus" src="../Icons/Plus.svg"></button>
                <label class="taste-stimulus-label"></label>
            </div>
            <!-- --------------------------------------------------------------------------------------------------------------- -->
            <!-- --------------------------------------------------------------------------------------------------------------- -->

            <div class="olifactory-stimulus">

                <button class="olifactory-four-step-button"></button>
                <div class="olifactory-four-step-div">
                    <p class="olifactory-four-step-heading">&nbsp;Heading</p>
                    <p class="olifactory-four-step-description">&nbsp; Description</p>
                </div>
                
                <div class="olifactory-stimulus-icon">
                    <img class="normal-image" src="../Icons/Olifactory Grey.svg" alt="Normal Image">
                    <img class="hover-image" src="../Icons/Olifactory.svg" alt="Hover Image">
                </div>
                
                <div class="populate-olifactory-stimulus"></div>

                <div class="olifactory-stimulus-input-div">
                    <textarea class="olifactory-stimulus-input" rows="4" cols="50" placeholder="Enter objects separated by space. Use only one noun to describe one object"></textarea>
                </div>

                <button class="olifactory-stimulus-button"><img class="add-olifactory-stimulus" src="../Icons/Plus.svg"></button>
                <label class="olifactory-stimulus-label"></label>
            </div>

        </div>
        <!-- --------------------------------------------------------------------------------------------------------------- -->
        <!-- --------------------------------------------------------------------------------------------------------------- -->
        <!-- --------------------------------------------------------------------------------------------------------------- -->

        <div class="mental-object">
            <div class="feeling-state">

                <button class="feeling-four-step-button"></button>
                <div class="feeling-four-step-div">
                    <p class="feeling-four-step-heading">&nbsp;Heading</p>
                    <p class="feeling-four-step-description">&nbsp; Description</p>
                </div>

                <label class="feeling-state-label"></label>

                <div class="unpleasant-feeling"><button class="unpleasant-button">
                    <img class="previous-stage-icon" src="../Icons/Sad.svg">
                    <p class="unpleasant-text">Unpleasant</p>
                </button></div>
                
                <div class="neutral-feeling"><button class="neutral-button">
                    <img class="previous-stage-icon" src="../Icons/Neutral.svg">
                    <p class="unpleasant-text">Neutral</p>
                </button></div>
                
                <div class="pleasant-feeling"><button class="pleasant-button">
                    <img class="previous-stage-icon" src="../Icons/Happy.svg">
                    <p class="unpleasant-text">Pleasant</p>
                </button></div>
            </div>
            <!-- --------------------------------------------------------------------------------------------------------------- -->
            <!-- --------------------------------------------------------------------------------------------------------------- -->
            
            <div class="thought-state">

                <button class="thought-four-step-button"></button>
                <div class="thought-four-step-div">
                    <p class="thought-four-step-heading">&nbsp;Heading</p>
                    <p class="thought-four-step-description">&nbsp; Description</p>
                </div>

                <div class="thought-state-icon">
                    <img class="normal-image" src="../Icons/Thought Grey.svg" alt="Normal Image">
                    <img class="hover-image" src="../Icons/Thought.svg" alt="Hover Image">
                </div>
                
                <div class="populate-thought-state"></div>

                <div class="thought-state-input-div">
                    <textarea class="thought-state-input" rows="4" cols="50" placeholder="Enter objects separated by space. Use only one noun to describe one object"></textarea>
                </div>

                <button class="thought-state-button"><img class="add-thought-state" src="../Icons/Plus.svg"></button>
                <label class="thought-state-label"></label>
            </div>
            <!-- --------------------------------------------------------------------------------------------------------------- -->
            <!-- --------------------------------------------------------------------------------------------------------------- -->
            
            <div class="emotional-state">
                
                <button class="emotional-four-step-button"></button>
                <div class="emotional-four-step-div">
                    <p class="emotional-four-step-heading">&nbsp;Heading</p>
                    <p class="emotional-four-step-description">&nbsp; Description</p>
                </div>

                <div class="emotional-state-icon">
                    <img class="normal-image" src="../Icons/Emotional Grey.svg" alt="Normal Image">
                    <img class="hover-image" src="../Icons/Emotional.svg" alt="Hover Image">
                </div>
                
                <div class="populate-emotional-state"></div>

                <div class="emotional-state-input-div">
                    <textarea class="emotional-state-input" rows="4" cols="50" placeholder="Enter objects separated by space. Use only one noun to describe one object"></textarea>
                </div>

                <button class="emotional-state-button"><img class="add-emotional-state" src="../Icons/Plus.svg"></button>
                <label class="emotional-state-label"></label>
            </div>
        </div>
        <!-- --------------------------------------------------------------------------------------------------------------- -->
        <!-- --------------------------------------------------------------------------------------------------------------- -->
        <!-- --------------------------------------------------------------------------------------------------------------- -->

        <button class="aha-moment">
            <p class="aha-text">AHA!</p>
            <p class="aha-counter" id="counter">0</p>
        </button>
        <!-- --------------------------------------------------------------------------------------------------------------- -->
        <!-- --------------------------------------------------------------------------------------------------------------- -->
        <!-- --------------------------------------------------------------------------------------------------------------- -->

        <div class="next-stage">
            <button class="next-stage-button"><img class="next-stage-icon" src="../Icons/chevron-right.svg"></button>
        </div>
    </div>
    
</body>
</html>