<?php
// Include the PHP file with the function to create a new Session object
include_once('../../Back-end/Connect.php');

// Create a database connection
$con = new Connect;
$db = $con->__getConnection();
$db->query('USE Arm_mo_v2');

// Check if the request contains the session object
if (isset($_POST['session'])) {
    $session = json_decode($_POST['session'], true);

    // Extract the properties from the session object
    $meditator = $session['Meditator'];
    $startDateTime = $session['Start_Date_Time'];
    $endDateTime = $session['End_Date_Time'];
    $practicedStages = $session['Practiced_Stages'];
    $steps = $session['Steps'];
    $ahaMoments = $session['AhaMoments'];
    $newlyMasteredStages = $session['Newly_Mastered_Stages'];

    // Insert the new session into the Session table
    $sql = "INSERT INTO Session (Meditator_ID, Start_Time, End_Time)
            VALUES ('$meditator', '$startDateTime', '$endDateTime')";
    $result = $db->query($sql);

    if ($result) {
        echo 'Session created successfully.';
    } else {
        echo 'Failed to create session.';
    }
} else {
    echo 'No session object found in the request.';
}
?>