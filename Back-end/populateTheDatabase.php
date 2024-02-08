<?php
// We will populate the database up until stage 3 for now

// Connect to the database
{
    include_once('Connect.php');
    $con = new Connect();
    $db = $con->__getConnection();
    $databaseName = 'Arm_mo_v2';
    $queryUseArm_mo_v2 ="USE  $databaseName";
    if($db->query($queryUseArm_mo_v2)){
        echo"
            <script>
                alert('Currently using the database $databaseName!')
            </script>
        ";
    }
    else{
        echo"
            <script>
                alert('$databaseName not in use!')
            </script>
        ";
   
    }

}

// Populating the Meditation stage table
{
    // The Intention table was populated when the database,the tables and procedures
    // were created. The existense of the Intentions was essential in creating
    // any instances of meditators.
}

// Populating the intention table
{
    $Intention = ['Put all your effort into forming and holding a conscious intention to sit down and meditate for a set period every day, and practice diligently for the duration of the sit'
    ,'Appreciate the “aha” moment that recognizes mind-wandering, while gently but firmly redirecting attention back to the breath. Then, intend to engage with the breath as fully as possible without losing peripheral awareness.'
    ,'Invoke introspective attention frequently, before you’ve forgotten the breath or fallen asleep, and make corrections as soon as you notice distractions or dullness. Also, intend to sustain peripheral awareness while engaging with the breath as fully as possible.'];
    $counter=0;
    foreach ($Intention as $Intentions) {
        $sqlCheckIntention = "SELECT COUNT(*) FROM Intention WHERE Description = '$Intentions'";
        $result = $db->query($sqlCheckIntention);

        if ($result->fetch_row()[0] == 0) {
            $counter++;
            $sqlInsertIntention = "INSERT INTO Intention(Description,Stage_ID) VALUES ('$Intentions',$counter)";
            $db->query($sqlInsertIntention);
            echo "
                <script>
                    console.log('Intention $Intentions added successfully!')
                </script>
            ";
        } else {
            echo "
                <script>
                    console.log('Intention $Intentions already exists!')
                </script>
            ";
        }
    }
}

// Populating the mastery requirement table
{
    function checkRecordExistsStageMasteryRequirement($masteryRequirementDescription, $stageID) {
        global $db;
        $query = "SELECT * FROM MasteryRequirement WHERE Description = '$masteryRequirementDescription' AND Stage_ID = $stageID";
        $result = $db->query($query);
        return ($result->num_rows > 0);
    }

    $associations = [
        ['masteryRequirementDescription' => "I never miss a daily practice session.", 'stageID' => 1],
        ['masteryRequirementDescription' => "I do not procastinate while meditating.", 'stageID' => 1],
        ['masteryRequirementDescription' => "I can sustain attention on the meditation object for 10-15 minutes.", 'stageID' => 2],
        ['masteryRequirementDescription' => "Most periods of mind-wandering last only a few seconds.", 'stageID' => 2],
        ['masteryRequirementDescription' => "I rarely forget the breath or fall asleep.", 'stageID' => 3]
    ];
    
    foreach ($associations as $association) {
        $masteryRequirementDescription = $association['masteryRequirementDescription'];
        $stageID = $association['stageID'];
    
        if (checkRecordExistsStageMasteryRequirement($masteryRequirementDescription, $stageID)) {
            echo "
                <script>
                    console.log('Entry already exists for Description: $masteryRequirementDescription and Stage_ID: $stageID');
                </script>
            ";
        } else {
            // Insert the new record into the table
            $queryInsert = "INSERT INTO MasteryRequirement (Description, Stage_ID) VALUES ('$masteryRequirementDescription', $stageID)";
            $db->query($queryInsert);
    
            if ($db->affected_rows > 0) {
                echo "
                    <script>
                        console.log('New record inserted for Mastery Requirement Description: $masteryRequirementDescription and Stage_ID: $stageID');
                    </script>
                ";
            } else {
                echo "
                    <script>
                        console.log('Failed to insert record for Mastery Requirement Description: $masteryRequirementDescription and Stage_ID: $stageID');
                    </script>
                ";
            }
        }
    }
}

// Populating the Skills table
{
    $Skills = ['Creating practice routines', 'setting specific practice goals','generating strong motivation','cultivating discipline and diligence'
    ,'Reinforcing spontaneous introspective awareness and learning to sustain attention on the meditation object. Spontaneous introspective awareness is the “aha” moment when you suddenly realize there’s a disconnect between what you wanted to do (watch the breath) and what you’re actually doing (thinking about something else). Appreciating this moment causes it to happen faster and faster, so the periods of mind-wandering get shorter and shorter.'
    ,'Use the techniques of following the breath and connecting to extend the periods of uninterrupted attention, and become familiar with how forgetting happens'
    ];

    foreach ($Skills as $Skill) {
        $sqlCheckSkill = "SELECT COUNT(*) FROM Skill WHERE Description = '$Skill'";
        $result = $db->query($sqlCheckSkill);

        if ($result->fetch_row()[0] == 0) {
            $sqlInsertSkill = "INSERT INTO Skill(Description) VALUES ('$Skill')";
            $db->query($sqlInsertSkill);
            echo "
                <script>
                    console.log('Skill $Skill added successfully!')
                </script>
            ";
        } else {
            echo "
                <script>
                    console.log('Skill $Skill already exists!')
                </script>
            ";
        }
    }
}

// Populating the obstacles table
{
    $obstacles = ['Procrastination', 'Fatigue','Resistance','Impatience','Boredom','lack of motivation',
    'Mind-wandering','Monkey-mind','Distractions','Forgetting','Sleepiness'];

    foreach ($obstacles as $obstacle) {
        $sqlCheckObstacle = "SELECT COUNT(*) FROM Obstacle WHERE Description = '$obstacle'";
        $result = $db->query($sqlCheckObstacle);

        if ($result->fetch_row()[0] == 0) {
            $sqlInsertObstacle = "INSERT INTO Obstacle(Description) VALUES ('$obstacle')";
            $db->query($sqlInsertObstacle);
            echo "
                <script>
                    console.log('Obstacle $obstacle added successfully!')
                </script>
            ";
        } else {
            echo "
                <script>
                    console.log('Obstacle $obstacle already exists!')
                </script>
            ";
        }
    }
}

// Populating the Antidote table
{
    function checkRecordExistsAntidote($AntidoteType, $Severity,$Antidote) {
        global $db;
        $query = "SELECT * FROM Antidote WHERE Type = ? AND Severity = ? AND Antidote = ?";
        $stmt = $db->prepare($query);
        $stmt->bind_param("sss", $AntidoteType, $Severity, $Antidote);
        $stmt->execute();
        $result = $stmt->get_result();
        return ($result->num_rows > 0);
    }

    $AntidoteInstances = [
        ['AntidoteType' => 'Dullness', 'Severity' => 'Mild','Antidote'=>'Engage more fully with the breath'],
        ['AntidoteType' => 'Dullness', 'Severity' => 'Mild','Antidote'=>'Open up awareness and let external sounds and sensation in'],
        ['AntidoteType' => 'Dullness', 'Severity' => 'Mild','Antidote'=>'Straighten up sitting position'],
        ['AntidoteType' => 'Dullness', 'Severity' => 'Mild','Antidote'=>'Open eyes a crack and let light in'],
        ['AntidoteType' => 'Dullness', 'Severity' => 'Mild','Antidote'=>'Take 3-5 deeper breaths'],
        ['AntidoteType' => 'Dullness', 'Severity' => 'Mild','Antidote'=>'Do a quick Leisure and fortune meditation - I am so lucky to have a life where I have the spare time and freedom to practice so I am going to make it count!'],

        ['AntidoteType' => 'Dullness', 'Severity' => 'Moderate','Antidote'=>'Open eyes fully and meditate for a while with eyes open'],
        ['AntidoteType' => 'Dullness', 'Severity' => 'Moderate','Antidote'=>'Release breath with resistance at lips (slight ‘raspberry’)'],
        ['AntidoteType' => 'Dullness', 'Severity' => 'Moderate','Antidote'=>'Squeeze and release perineum several times'],
        ['AntidoteType' => 'Dullness', 'Severity' => 'Moderate','Antidote'=>'Clench hands until arms shaking then release'],
        ['AntidoteType' => 'Dullness', 'Severity' => 'Moderate','Antidote'=>'Clench whole body till shaking and release. Repeat'],

        ['AntidoteType' => 'Dullness', 'Severity' => 'Severe','Antidote'=>'Stand up'],
        ['AntidoteType' => 'Dullness', 'Severity' => 'Severe','Antidote'=>'Practice walking meditation for a bit'],
        ['AntidoteType' => 'Dullness', 'Severity' => 'Severe','Antidote'=>'Splash water on your face'],
        ['AntidoteType' => 'Dullness', 'Severity' => 'Severe','Antidote'=>'Nap and come back']
    ];
    
    foreach ($AntidoteInstances as $AntidoteInstance) {
        $AntidoteType = $AntidoteInstance['AntidoteType'];
        $Severity = $AntidoteInstance['Severity'];
        $Antidote = $AntidoteInstance['Antidote'];
    
        if (checkRecordExistsAntidote($AntidoteType, $Severity, $Antidote)) {
            echo "
                <script>
                    console.log('Entry already exists for AntidoteType: $AntidoteType and Severity: $Severity');
                </script>
            ";
        } else {
            // Insert the new record into the table
            $queryInsert = "INSERT INTO Antidote (Type, Severity, Antidote) VALUES (?, ?, ?)";
            $stmtInsert = $db->prepare($queryInsert);
            $stmtInsert->bind_param("sss", $AntidoteType, $Severity, $Antidote);
            $stmtInsert->execute();
    
            if ($db->affected_rows > 0) {
                echo "
                    <script>
                        console.log('New record inserted for AntidoteType: $AntidoteType and Severity: $Severity');
                    </script>
                ";
            } else {
                echo "
                    <script>
                        console.log('Failed to insert record for AntidoteType: $AntidoteType and Severity: $Severity');
                    </script>
                ";
            }
        }
    }
}

// Creating a dummy session
{
   // Check if the dummy session already exists
    $sqlCheckDummySession = "SELECT * FROM Session WHERE Meditator_ID = 1";
    $resultCheckDummySession = $db->query($sqlCheckDummySession);

    if ($resultCheckDummySession->num_rows > 0) {
        echo "
            <script>
                console.log('Dummy session already exists. Skipping insertion.')
            </script>
        ";
    } else {
        // Get the current date and time
        $currentTime = date('Y-m-d H:i:s');

        // Set the dummy session start and end times
        $startTime = $currentTime;
        $endTime = date('Y-m-d H:i:s', strtotime('+1 hour', strtotime($startTime)));

        // Insert the dummy session into the Session table
        $sqlInsertSession = "INSERT INTO Session (Meditator_ID, Start_Time, End_Time)
                            VALUES (1, '$startTime', '$endTime')";
        if ($db->query($sqlInsertSession)) {
            echo "
                <script>
                    console.log('Dummy session created successfully!')
                </script>
            ";
        } else {
            echo "
                <script>
                    console.log('Failed to create dummy session!')
                </script>
            ";
        }
    }
}

//creating dummy entries for practiced stages
{
    $sessionID = 1;
    $stages = [1, 2, 3];

    foreach ($stages as $stageID) {
        // Check if the record already exists
        $query = "SELECT * FROM practiced_stages WHERE Stage_ID = $stageID AND Session_ID = $sessionID";
        $result = $db->query($query);

        if ($result->num_rows > 0) {
            echo "
                <script>
                    console.log('Entry already exists for Stage_ID: $stageID and Session_ID: $sessionID');
                </script>
            ";
        } else {
            // Insert the new record into the table
            $queryInsert = "INSERT INTO practiced_stages (Stage_ID, Session_ID) VALUES ($stageID, $sessionID)";
            $db->query($queryInsert);

            if ($db->affected_rows > 0) {
                echo "
                    <script>
                        console.log('New record inserted for Stage_ID: $stageID and Session_ID: $sessionID');
                    </script>
                ";
            } else {
                echo "
                    <script>
                        console.log('Failed to insert record for Stage_ID: $stageID and Session_ID: $sessionID');
                    </script>
                ";
            }
        }
    }
} 

// Populating the Step table
{
    // Get the session ID of the dummy session
    $sqlGetDummySessionID = "SELECT Session_ID FROM Session WHERE Meditator_ID = 1";
    $resultGetDummySessionID = $db->query($sqlGetDummySessionID);

    if ($resultGetDummySessionID->num_rows > 0) {
        $row = $resultGetDummySessionID->fetch_assoc();
        $dummySessionID = $row['Session_ID'];

        // Populating the Step table
        {
            // Define the JavaScript data array
            $preparationSteps = [
                [
                    "Activity",
                    "Write down the activity you choose to do.",
                    "Preparation",
                    "Question"
                ],
                [
                    "Motivation",
                    "Review your purpose for doing this activity. Don't judge your reasons. Be aware and accept them.",
                    "Preparation",
                    "Question"
                ],
                [
                    "Goal",
                    "Decide on what you hope to work on in this session. Keep it simple and small.",
                    "Preparation",
                    "Question"
                ],
                [
                    "Expectations",
                    "Remember the dangers of expecting unreasonably and too highly. Be gentle with yourself.",
                    "Preparation",
                    "Instruction"
                ],
                [
                    "Diligence",
                    "Resolve to practice diligently for the entire session no matter how it goes. Write it down.",
                    "Preparation",
                    "Question"
                ],
                [
                    "Distractions",
                    "Write down thoughts, emotions, ideas, plans, worries or any other distractions that may arise. Resolve to set them aside if they arise in the middle of the activity.",
                    "Preparation",
                    "Question"
                ],
                [
                    "Posture",
                    "Make yourself as comfortable as possible.",
                    "Preparation",
                    "Instruction"
                ]
            ];

            // Prepare and execute INSERT statements for each step
            foreach ($preparationSteps as $step) {
                $title = $step[0];
                $description = $step[1];
                $category = $step[2];
                $type = $step[3];

                // Check if the step already exists
                $sqlCheckStep = "SELECT * FROM Step WHERE Title = ? AND Session_ID = ?";
                $stmtCheckStep = $db->prepare($sqlCheckStep);
                $stmtCheckStep->bind_param("si", $title, $dummySessionID);
                $stmtCheckStep->execute();
                $resultCheckStep = $stmtCheckStep->get_result();

                if ($resultCheckStep->num_rows > 0) {
                    echo "
                        <script>
                            console.log('Step $title for dummy session already exists. Skipping insertion.')
                        </script>
                    ";
                } else {
                    $sqlInsertStep = "INSERT INTO Step (Session_ID, Title, Description, Type, Category, Duration, Response)
                                    VALUES (?, ?, ?, ?, ?, '', '')";
                    $stmtInsertStep = $db->prepare($sqlInsertStep);
                    $stmtInsertStep->bind_param("issss", $dummySessionID, $title, $description, $type, $category);
                    $stmtInsertStep->execute();

                    echo "
                        <script>
                            console.log('Step $title for dummy session added successfully!')
                        </script>
                    ";
                }
            }
        }
    } else {
        echo "
            <script>
                console.log('Dummy session does not exist. Cannot populate steps.')
            </script>
        ";
    }
}


// Creating dummy observable objects
{
    // Get the session ID of the dummy session
    $sqlGetDummySessionID = "SELECT Session_ID FROM Session WHERE Meditator_ID = 1";
    $resultGetDummySessionID = $db->query($sqlGetDummySessionID);

    if ($resultGetDummySessionID->num_rows > 0) {
        $row = $resultGetDummySessionID->fetch_assoc();
        $dummySessionID = $row['Session_ID'];

        // Populating the ObservableObject table
        {
            // Define the JavaScript data array
            $observableObjects = [
                [
                    "Laptop",
                    "SensoryStimulus"
                ],
                [
                    "Dream",
                    "MentalObject"
                ],
                [
                    "Music",
                    "SensoryStimulus"
                ],
                [
                    "Pain",
                    "MentalObject"
                ],
            ];

            // Prepare and execute INSERT statements for each observableObject
            foreach ($observableObjects as $observableObject) {
                $title = $observableObject[0];
                $discriminator = $observableObject[1];

                // Check if the observableObject already exists
                $sqlCheckObservableObject = "SELECT * FROM ObservableObject WHERE Title = ? AND Session_ID = ?";
                $stmtCheckObservableObject = $db->prepare($sqlCheckObservableObject);
                $stmtCheckObservableObject->bind_param("si", $title, $dummySessionID);
                $stmtCheckObservableObject->execute();
                $resultCheckObservableObject = $stmtCheckObservableObject->get_result();

                if ($resultCheckObservableObject->num_rows > 0) {
                    echo "
                        <script>
                            console.log('ObservableObject $title for dummy session already exists. Skipping insertion.')
                        </script>
                    ";
                } else {
                    $sqlInsertObservableObject = "INSERT INTO ObservableObject (Session_ID, Title, Description, Icon, Discriminator, SensoryStimulus_Type, MentalObject_Type, Intensity)
                                    VALUES (?, ?, '', '', ?, '', '', '')";
                    $stmtInsertObservableObject = $db->prepare($sqlInsertObservableObject);
                    $stmtInsertObservableObject->bind_param("iss", $dummySessionID, $title, $discriminator);
                    $stmtInsertObservableObject->execute();

                    echo "
                        <script>
                            console.log('ObservableObject $title for dummy session added successfully!')
                        </script>
                    ";
                }
            }
        }
    } else {
        echo "
            <script>
                console.log('Dummy session does not exist. Cannot populate observableObjects.')
            </script>
        ";
    }
}

// Creating a dummy activity


// populating the stage obstacle association relationship table
{
    function checkRecordExistsStageObstacle($obstacleID, $stageID) {
        global $db;
        $query = "SELECT * FROM stage_obstacle_association WHERE Obstacle_ID = $obstacleID AND Stage_ID = $stageID";
        $result = $db->query($query);
        return ($result->num_rows > 0);
    }

    $associations = [
        ['obstacleID' => 1, 'stageID' => 1],
        ['obstacleID' => 2, 'stageID' => 1],
        ['obstacleID' => 3, 'stageID' => 1],
        ['obstacleID' => 4, 'stageID' => 1],
        ['obstacleID' => 5, 'stageID' => 1],
        ['obstacleID' => 6, 'stageID' => 1],
        ['obstacleID' => 7, 'stageID' => 2],
        ['obstacleID' => 8, 'stageID' => 2],
        ['obstacleID' => 4, 'stageID' => 2],
        ['obstacleID' => 9, 'stageID' => 3],
        ['obstacleID' => 10, 'stageID' => 3],
        ['obstacleID' => 7, 'stageID' => 3],
        ['obstacleID' => 11, 'stageID' => 3]
    ];
    
    foreach ($associations as $association) {
        $obstacleID = $association['obstacleID'];
        $stageID = $association['stageID'];
    
        if (checkRecordExistsStageObstacle($obstacleID, $stageID)) {
            echo "
                <script>
                    console.log('Entry already exists for Obstacle_ID: $obstacleID and Stage_ID: $stageID');
                </script>
            ";
        } else {
            // Insert the new record into the table
            $queryInsert = "INSERT INTO stage_obstacle_association (Obstacle_ID, Stage_ID) VALUES ($obstacleID, $stageID)";
            $db->query($queryInsert);
    
            if ($db->affected_rows > 0) {
                echo "
                    <script>
                        console.log('New record inserted for Obstacle_ID: $obstacleID and Stage_ID: $stageID');
                    </script>
                ";
            } else {
                echo "
                    <script>
                        console.log('Failed to insert record for Obstacle_ID: $obstacleID and Stage_ID: $stageID');
                    </script>
                ";
            }
        }
    }
}

// populating the stage Skill association relationship table
{
    function checkRecordExistsStageSkill($SkillID, $stageID) {
        global $db;
        $query = "SELECT * FROM stage_Skill_association WHERE Skill_ID = $SkillID AND Stage_ID = $stageID";
        $result = $db->query($query);
        return ($result->num_rows > 0);
    }

    $associations = [
        ['SkillID' => 1, 'stageID' => 1],
        ['SkillID' => 2, 'stageID' => 1],
        ['SkillID' => 3, 'stageID' => 1],
        ['SkillID' => 4, 'stageID' => 1],
        ['SkillID' => 5, 'stageID' => 2],
        ['SkillID' => 6, 'stageID' => 3]
    ];
    
    foreach ($associations as $association) {
        $SkillID = $association['SkillID'];
        $stageID = $association['stageID'];
    
        if (checkRecordExistsStageSkill($SkillID, $stageID)) {
            echo "
                <script>
                    console.log('Entry already exists for Skill_ID: $SkillID and Stage_ID: $stageID');
                </script>
            ";
        } else {
            // Insert the new record into the table
            $queryInsert = "INSERT INTO stage_Skill_association (Skill_ID, Stage_ID) VALUES ($SkillID, $stageID)";
            $db->query($queryInsert);
    
            if ($db->affected_rows > 0) {
                echo "
                    <script>
                        console.log('New record inserted for Skill_ID: $SkillID and Stage_ID: $stageID');
                    </script>
                ";
            } else {
                echo "
                    <script>
                        console.log('Failed to insert record for Skill_ID: $SkillID and Stage_ID: $stageID');
                    </script>
                ";
            }
        }
    }
}



?>