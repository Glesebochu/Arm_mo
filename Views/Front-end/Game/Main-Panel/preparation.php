<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="../Icons/Arm-mo Title Icon 2.png" type="image/x-icon">
  <title>Arm'mo</title>
  <link rel="stylesheet" href="../styles/general-styles.css">
  <link rel="stylesheet" href="../styles/preparation.css">
  <link rel="stylesheet" href="../../Font.css" />

  <!-- Meditator Object Retreival test -->
  <?php
  // Include the PHP file with the function to retrieve the Meditator object
  include_once '../../../Back-end/Models/Meditator.php';
  session_start();
  $identifier = $_SESSION['UsernametoEdit'];
  $javascriptMeditator = Meditator::getJavaScriptMeditator($identifier);
  ?>

  

  <!-- Activity Object Retreival test -->
  <?php
  // Include the PHP file with the Activity class definition
  include_once '../../../Back-end/Models/Activity.php';
  $javascriptActivityArray = Activity::getJavaScriptActivityArray();
  ?>
  <script type="module">
    // Import the Meditator.js module
    import {
      Meditator
    } from '../../../Middle-logic/Models/Meditator.js';

    // Output the JavaScript code to create the Meditator object
    var meditatorObj = <?php echo $javascriptMeditator; ?>;
    var meditator = Meditator.getMeditatorFromObject(meditatorObj);
    console.log(meditator);


    // -------------------------------------------------

    // // Import the Session.js module
    import {
      Session
    } from '../../../Middle-logic/Models/Session.js';

    // // Output the JavaScript code to create the Session objects
    // var session = <?php //echo $javascriptSession;
                      ?>;
    // var jsSession = Session.getSessionFromObject(session);
    // jsSession.Start_Date_Time = Date.now();

    // --------------------------------------------------------------------------
    // Create a Session object

    var newSession = new Session();
    newSession.Start_Date_Time = Session.getSQLDate(Date.now());
    newSession.Meditator = meditator;
    Session.createSession(newSession);
    // newSession.Session_ID = <?php //$_SESSION['session'];?>;

    //   console.log(jsSession, jsActivityArray);
    
  </script>

  <!-- Session Object Retreival test -->
  <?php
  // Include the PHP file with the function to retrieve the Session object
  include_once '../../../Back-end/Models/Session.php';
  // session_start();
  $identifier = $_SESSION['session'];
  // Call the function to get the JavaScript Session array
  $javascriptSession = Session::getJavaScriptSession($identifier);
  ?>
  <script type="module" >
    // // Import the Session.js module
    import {
      Session
    } from '../../../Middle-logic/Models/Session.js';
    import { prepare } from '../scripts/preparation.js';

    // Output the JavaScript code to create the Session objects
    var session = <?php echo $javascriptSession;?>;
    var jsSession = Session.getSessionFromObject(session);

    // --------------------------------------------

    // Import the Activity.js module
    import {
      Activity
    } from '../../../Middle-logic/Models/Activity.js';

    var activityArrayObj = <?php echo $javascriptActivityArray; ?>;
    var jsActivityArray = Activity.getActivitiesFromArrayObject(activityArrayObj);
    //   console.log(jsActivityArray);
    
    prepare(jsSession, jsActivityArray);
  </script>

  <script src="../scripts/preparation.js" type="module"></script>
</head>

<body>
  <header>
    <h2 id="preparation-title"></h2>
  </header>
  <main>
    <p id="preparation-description"></p>
    <input type="text" id="preparation-input" placeholder="Your answer...">
    <select name="preparation-activity-select" id="preparation-activity-select"></select>
    <p id="preparation-error-message">Please fill this in.</p>
  </main>
  <footer>
    <button class="preparation-button" id="preparation-previous">Previous</button>
    <button type="submit" class="preparation-button" id="preparation-next">Next</button>
  </footer>
</body>

</html>