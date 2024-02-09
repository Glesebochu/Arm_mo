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
            Meditator_ID = '$meditator',
            Start_Date_Time = '$startDateTime',
            End_Date_Time = '$endDateTime'
            WHERE Session_ID = '$session_ID'";
    $result = $db->query($sql);

    if ($result) {
        // Delete existing steps for the session
        $deleteStepsSql = "DELETE FROM Step WHERE Session_ID = '$session_ID'";
        $deleteStepsResult = $db->query($deleteStepsSql);

        if ($deleteStepsResult) {
            // Insert new steps for the session
            foreach ($steps as $step) {
                $title = $db->real_escape_string($step['Title']);
                $description = $db->real_escape_string($step['Description']);
                $type = $db->real_escape_string($step['Type']);
                $category = $db->real_escape_string($step['Category']);
                $duration = $db->real_escape_string($step['Duration']);
                $response = $db->real_escape_string($step['Response']);
                // $activity_ID = $db->real_escape_string($step['Activity']);

                $insertStepSql = "INSERT INTO Step (Session_ID, Title, Description, Type, Category, Duration, Response)
                                  VALUES ('$session_ID', '$title', '$description', '$type', '$category', '$duration', '$response')";
                $insertStepResult = $db->query($insertStepSql);

                if (!$insertStepResult) {
                    echo 'Failed to insert steps for the session.';
                    exit;
                }
            }

            echo 'Session updated successfully.';
        } else {
            echo 'Failed to delete existing steps for the session.';
        }
    } else {
        echo 'Failed to update session.';
    }
} else {
    echo 'No session object found in the request.';
}
?>