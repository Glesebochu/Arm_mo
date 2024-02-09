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
    // echo $meditator;
    $startDateTime = $session['Start_Date_Time'];
    $endDateTime = $session['End_Date_Time'];
    $practicedStages = $session['PracticedStages'];
    $steps = $session['Steps'];
    $ahaMoments = $session['AhaMoments'];
    $newlyMasteredStages = $session['Newly_Mastered_Stages'];

    // Update the Session table
    $sql = "UPDATE Session SET
    Meditator_ID = '{$meditator['Meditator_ID']}',
    Start_Date_Time = '$startDateTime',
    End_Date_Time = '$endDateTime'
    WHERE Session_ID = '$session_ID'";
    $result = $db->query($sql);

    if ($result) {
        // Update or insert steps for the session
        foreach ($steps as $step) {
            $step_ID = $step['Step_ID'];
            $title = $db->real_escape_string($step['Title']);
            $description = $db->real_escape_string($step['Description']);
            $type = $db->real_escape_string($step['Type']);
            $category = $db->real_escape_string($step['Category']);
            $duration = $db->real_escape_string($step['Duration']);
            $response = $db->real_escape_string($step['Response']);

            // Check if the step exists for the session
            $checkStepSql = "SELECT * FROM Step WHERE Step_ID = '$step_ID' AND Session_ID = '$session_ID'";
            $checkStepResult = $db->query($checkStepSql);

            if ($checkStepResult->num_rows > 0) {
                // Step exists, update the step
                $updateStepSql = "UPDATE Step SET
                                  Title = '$title',
                                  Description = '$description',
                                  Type = '$type',
                                  Category = '$category',
                                  Duration = '$duration',
                                  Response = '$response'
                                  WHERE Step_ID = '$step_ID' AND Session_ID = '$session_ID'";
                $updateStepResult = $db->query($updateStepSql);

                if (!$updateStepResult) {
                    echo 'Failed to update steps for the session.';
                    exit;
                }
            } else {
                // Step does not exist, insert the step
                $insertStepSql = "INSERT INTO Step (Step_ID, Session_ID, Title, Description, Type, Category, Duration, Response) 
                                  VALUES ('$step_ID', '$session_ID', '$title', '$description', '$type', '$category', '$duration', '$response')";
                $insertStepResult = $db->query($insertStepSql);

                if (!$insertStepResult) {
                    echo 'Failed to insert steps for the session.';
                    exit;
                }
            }
        }

        // Update or insert AhaMoments for the session
        foreach ($ahaMoments as $ahaMoment) {
            $ahaMoment_ID = $ahaMoment['AhaMoment_ID'];
            $label = $db->real_escape_string($ahaMoment['Label']);

            // Check if the AhaMoment exists for the session
            $checkAhaMomentSql = "SELECT * FROM AhaMoment WHERE AhaMoment_ID = '$ahaMoment_ID' AND Session_ID = '$session_ID'";
            $checkAhaMomentResult = $db->query($checkAhaMomentSql);

            if ($checkAhaMomentResult->num_rows > 0) {
                // AhaMoment exists, update the AhaMoment
                $updateAhaMomentSql = "UPDATE AhaMoment SET
                                       Label = '$label'
                                       WHERE AhaMoment_ID = '$ahaMoment_ID' AND Session_ID = '$session_ID'";
                $updateAhaMomentResult = $db->query($updateAhaMomentSql);

                if (!$updateAhaMomentResult) {
                    echo 'Failed to update AhaMoments for the session.';
                    exit;
                }
            } else {
                // AhaMoment does not exist, insert the AhaMoment
                $insertAhaMomentSql = "INSERT INTO AhaMoment (AhaMoment_ID, Session_ID, Label) 
                                       VALUES ('$ahaMoment_ID', '$session_ID', '$label')";
                $insertAhaMomentResult = $db->query($insertAhaMomentSql);

                if (!$insertAhaMomentResult) {
                    echo 'Failed to insert AhaMoments for the session.';
                    exit;
                }
            }
        }
        // Update or insert PracticedStages for the session
        foreach ($practicedStages as $practicedStage) {
            $stage_ID = $practicedStage['Stage_ID'];

            // Check if the PracticedStage exists for the session
            $checkPracticedStageSql = "SELECT * FROM PracticedStages WHERE Stage_ID = '$stage_ID' AND Session_ID = '$session_ID'";
            $checkPracticedStageResult = $db->query($checkPracticedStageSql);

            if ($checkPracticedStageResult->num_rows === 0) {
                // PracticedStage does not exist, insert the PracticedStage
                $insertPracticedStageSql = "INSERT INTO PracticedStages (Stage_ID, Session_ID) 
                                            VALUES ('$stage_ID', '$session_ID')";
                $insertPracticedStageResult = $db->query($insertPracticedStageSql);

                if (!$insertPracticedStageResult) {
                    echo 'Failed to insert PracticedStages for the session.';
                    exit;
                }
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