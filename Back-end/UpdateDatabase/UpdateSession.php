<?php
// Include the PHP file with the function to update the Session object
include_once(__DIR__ . '/../Connect.php');

// Create a database connection
$con = new Connect;
$db = $con->__getConnection();
$db->query('USE Arm_mo_v2');

// Check if the request contains the session object
if (isset($_POST['session'])) {
    $session = json_decode($_POST['session'], true);

    // Extract the properties from the session object
    $session_ID = $session['Session_ID'];
    $meditator = $session['Meditator'];
    $startDateTime = $session['Start_Date_Time'];
    $endDateTime = $session['End_Date_Time'];
    $practicedStages = $session['Practiced_Stages'];
    $steps = $session['Steps'];
    $ahaMoments = $session['AhaMoments'];
    $newlyMasteredStages = $session['Newly_Mastered_Stages'];

    // Update the Session table
    $sql = "UPDATE Session SET
            Meditator_ID='$meditator', 
            Start_Time = '$startDateTime',
            End_Time = '$endDateTime',
            WHERE Session_ID = '$session_ID'";
    $result = $db->query($sql);

    if ($result) {
        echo 'Session updated successfully.';
    } else {
        echo 'Failed to update session.';
    }
} else {
    echo 'No session object found in the request.';
}
?>