<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preparation</title>
    <link rel="stylesheet" href="../styles/general-styles.css">
    <link rel="stylesheet" href="../styles/preparation.css">
    <link rel="stylesheet" href="../../Font.css"/>
    <script src="../scripts/preparation.js" type="module"></script>

    <!-- Session Object Retreival test -->
    <?php
      // Include the PHP file with the function to retrieve the Session object
      include_once '../../../Back-end/Models/Session.php';

      // $identifier = $_SESSION['session'];
      $identifier = 1;
      // Call the function to get the JavaScript Session array
      $javascriptSession = Session::getJavaScriptSession($identifier);
    ?>

    <!-- Activity Object Retreival test -->
    <?php
      // Include the PHP file with the Activity class definition
      include_once '../../../Back-end/Models/Activity.php';
      $javascriptActivityArray = Activity::getJavaScriptActivityArray();
    ?>
    <script type="module">
      // Import the Activity.js module
      import { Activity } from '../../../Middle-logic/Models/Activity.js';
      
      var activityArrayObj = <?php echo $javascriptActivityArray;?>;
      var jsActivityArray = Activity.getActivitiesFromArrayObject(activityArrayObj);
    //   console.log(jsActivityArray);

      // -------------------------------------------------

      // Import the Session.js module
      import { Session } from '../../../Middle-logic/Models/Session.js';
      import { prepare } from '../scripts/preparation.js';

      // Output the JavaScript code to create the Session objects
      var session = <?php echo $javascriptSession;?>;
      var jsSession = Session.getSessionFromObject(session);
      jsSession.Start_Date_Time = Date.now();

    //   console.log(jsSession, jsActivityArray);
      prepare(jsSession, jsActivityArray);

    </script>
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
