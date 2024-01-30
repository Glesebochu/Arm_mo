<?php
// We will populate the database up until stage 3 for now

// Connect to the database
{
    include_once('Connect.php');
    $con = new Connect();
    $db = $con->__getConnection();
    $databaseName = 'Arm_mo';
    $queryUseArm_mo ="USE  $databaseName";
    if($db->query($queryUseArm_mo)){
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