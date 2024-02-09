<?php
// Include the PHP file with the function to create a new Session object
include_once(__DIR__ . '/../Connect.php');

// Create a database connection
$con = new Connect;
$db = $con->__getConnection();
$db->query('USE Arm_mo_v2');
session_start();

// Check if the request contains the session object
if (isset($_POST['session'])) {
    $session = json_decode($_POST['session'], true);

    // Extract the properties from the session object
    $meditator = $session['Meditator'];
    $startDateTime = $session['Start_Date_Time'];
    $endDateTime = $session['End_Date_Time'];
    $practicedStages = $session['PracticedStages'];
    $steps = $session['Steps'];
    $ahaMoments = $session['AhaMoments'];
    $newlyMasteredStages = $session['Newly_Mastered_Stages'];

    // Insert the new session into the Session table
    $sql = "INSERT INTO Session (Meditator_ID, Start_Date_Time, End_Date_Time)
            VALUES ('{$meditator['Meditator_ID']}', '$startDateTime', '$endDateTime')";
    $result = $db->query($sql);

    if ($result) {
        // Get the session ID of the created session
        $session_ID = $db->insert_id;

        // Populate the session superglobal array
        $_SESSION['session'] = $session_ID;

        echo 'Session created successfully. With ID '.$_SESSION['session'];
    } else {
        echo 'Failed to create session.';
    }
} else {
    echo 'No session object found in the request.';
}
?>