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
    $practicedStages = $session['PracticedStages'];
    $steps = $session['Steps'];
    $ahaMoments = $session['AhaMoments'];
    $newlyMasteredStages = $session['Newly_Mastered_Stages'];

    // Check if the session already exists
    // $sql = "SELECT COUNT(*) as count FROM Session WHERE Session_ID = '$session_ID'";
    // $result = $db->query($sql);
    // $row = $result->fetch_assoc();
    // $sessionExists = ($row['count'] > 0);

    if ($isset($session_ID)) {
        // Update the existing session
        $sql = "UPDATE Session SET
        Meditator_ID = '{$meditator['Meditator_ID']}',
        Start_Date_Time = '$startDateTime',
        End_Date_Time = '$endDateTime'
        WHERE Session_ID = '$session_ID'";
        $result = $db->query($sql);
    } else {
        // Insert a new session
        $sql = "INSERT INTO Session (Session_ID, Meditator_ID, Start_Date_Time, End_Date_Time)
        VALUES ('$session_ID', '{$meditator['Meditator_ID']}', '$startDateTime', '$endDateTime')";
        $result = $db->query($sql);
    }

    if ($result) {
        // Update or insert steps for the session
        foreach ($steps as $step) {
            $step_ID = $step['Step_ID'];
            $stepTitle = $db->real_escape_string($step['Title']);
            $description = $db->real_escape_string($step['Description']);
            $type = $db->real_escape_string($step['Type']);
            $category = $db->real_escape_string($step['Category']);
            $duration = $db->real_escape_string($step['Duration']);
            $response = $db->real_escape_string($step['Response']);
            $activity = $step['Activity'];

            // Update or insert activity for the session
            if($activity){
                $activity_ID = $activity['Activity_ID'];
                $activityTitle = $db->real_escape_string($activity['Title']);
                $meditationObject = $activity['MeditationObject'];
            
                // Extract the properties from the MeditationObject
                $observableObject_ID = $meditationObject['ObservableObject_ID'];
                $observableObjectTitle = $db->real_escape_string($meditationObject['Title']);
                $discriminator = $db->real_escape_string($meditationObject['Discriminator']);
                $description = $db->real_escape_string($meditationObject['Description']);
                $icon = $db->real_escape_string($meditationObject['Icon']);
                $intensity = $meditationObject['Intensity'];
            
                // Check if the MeditationObject exists
                // $checkMeditationObjectSql = "SELECT * FROM ObservableObject WHERE ObservableObject_ID = '$observableObject_ID'";
                // $checkMeditationObjectResult = $db->query($checkMeditationObjectSql);
            
                if (isset($observableObject_ID)) {
                    // MeditationObject exists, update the MeditationObject
                    $updateMeditationObjectSql = "UPDATE ObservableObject SET
                                                  Title = '$observableObjectTitle',
                                                  Discriminator = '$discriminator',
                                                  Description = '$description',
                                                  Icon = '$icon',
                                                  Intensity = '$intensity'
                                                  WHERE ObservableObject_ID = '$observableObject_ID'";
                    $updateMeditationObjectResult = $db->query($updateMeditationObjectSql);
            
                    if (!$updateMeditationObjectResult) {
                        echo 'Failed to update MeditationObject.';
                        exit;
                    }
                } else {
                    // MeditationObject does not exist, insert the MeditationObject
                    $insertMeditationObjectSql = "INSERT INTO ObservableObject (ObservableObject_ID, Title, Discriminator, Description, Icon, Intensity) 
                                                  VALUES ('$observableObject_ID', '$observableObjectTitle', '$discriminator', '$description', '$icon', '$intensity')";
                    $insertMeditationObjectResult = $db->query($insertMeditationObjectSql);
            
                    if (!$insertMeditationObjectResult) {
                        echo 'Failed to insert MeditationObject.';
                        exit;
                    }
                }
    
                // Check if the activity exists for the session
                $checkActivitySql = "SELECT * FROM Activity WHERE Activity_ID = '$activity_ID'";
                $checkActivityResult = $db->query($checkActivitySql);
    
                if ($checkActivityResult->num_rows > 0) {
                    // Activity exists, update the activity
                    $updateActivitySql = "UPDATE Activity SET
                                        Title = '$activityTitle',
                                        MeditationObject_ID = '$observableObject_ID'
                                        WHERE Activity_ID = '$activity_ID'";
                    $updateActivityResult = $db->query($updateActivitySql);
    
                    if (!$updateActivityResult) {
                        echo 'Failed to update activity for the session.';
                        exit;
                    }
                } else {
                    // Activity does not exist, insert the activity
                    $insertActivitySql = "INSERT INTO Activity (Activity_ID, Title, MeditationObject_ID) 
                                        VALUES ('$activity_ID', '$title', '$observableObject_ID')";
                    $insertActivityResult = $db->query($insertActivitySql);
    
                    if (!$insertActivityResult) {
                        echo 'Failed to insert activity for the session.';
                        exit;
                    }
                }

            }


            // Check if the step exists for the session
            // $checkStepSql = "SELECT * FROM Step WHERE Step_ID = '$step_ID' AND Session_ID = '$session_ID'";
            // $checkStepResult = $db->query($checkStepSql);

            if (isset($step_ID)) {
                // Step exists, update the step
                $updateStepSql = "UPDATE Step SET
                                  Title = '$stepTitle',
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
                $insertStepSql = "INSERT INTO Step (Session_ID, Title, Description, Type, Category, Duration, Response) 
                                  VALUES ('$session_ID', '$title', '$description', '$type', '$category', '$duration', '$response')";
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
            // $checkAhaMomentSql = "SELECT * FROM AhaMoment WHERE AhaMoment_ID = '$ahaMoment_ID' AND Session_ID = '$session_ID'";
            // $checkAhaMomentResult = $db->query($checkAhaMomentSql);

            if (isset($ahaMoment_ID)) {
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
                $insertAhaMomentSql = "INSERT INTO AhaMoment (Session_ID, Label) 
                                       VALUES ('$session_ID', '$label')";
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