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
            Start_Time = '$startDateTime',
            End_Time = '$endDateTime'
            WHERE Session_ID = '$session_ID'";
    $result = $db->query($sql);

    if ($result) {
        // Update existing steps for the session
        foreach ($steps as $step) {
            $step_ID = $step['Step_ID'];
            $title = $db->real_escape_string($step['Title']);
            $description = $db->real_escape_string($step['Description']);
            $type = $db->real_escape_string($step['Type']);
            $category = $db->real_escape_string($step['Category']);
            $duration = $db->real_escape_string($step['Duration']);
            $response = $db->real_escape_string($step['Response']);

            $updateStepSql = "UPDATE Step SET
                              Title = '$title',
                              Description = '$description',
                              Type = '$type',
                              Category = '$category',
                              Duration = '$duration',
                              Response = 'test1'
                              WHERE Step_ID = '$step_ID' AND Session_ID = '$session_ID'";
            $updateStepResult = $db->query($updateStepSql);

            if (!$updateStepResult) {
                echo 'Failed to update steps for the session.';
                exit;
            }
        }

        // Update existing AhaMoments for the session
        foreach ($ahaMoments as $ahaMoment) {
            $ahaMoment_ID = $ahaMoment['AhaMoment_ID'];
            $label = $db->real_escape_string($ahaMoment['Label']);

            $updateAhaMomentSql = "UPDATE AhaMoment SET
                                   Label = '$label'
                                   WHERE AhaMoment_ID = '$ahaMoment_ID' AND Session_ID = '$session_ID'";
            $updateAhaMomentResult = $db->query($updateAhaMomentSql);

            if (!$updateAhaMomentResult) {
                echo 'Failed to update AhaMoments for the session.';
                exit;
            }
        }

        echo 'Session updated successfully.';
    } else {
        echo 'Failed to update session.';
    }
} else {
    echo 'No session object found in the request.';
}
?>