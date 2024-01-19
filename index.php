<?php
    // We need to create the database if it already exists, do not create it
    include_once('Connect.php');
    $con = new Connect();
    $db = $con->__getConnection();
    
    // Creating the Arm_mo database
    {
        $databaseName = 'Arm_mo';
        $queryDbExists = "SHOW DATABASES LIKE '$databaseName'";
        $resCheckDBExists = $db->query($queryDbExists);

        if ($resCheckDBExists->num_rows > 0) {
            echo "
                <script>
                    alert('Database $databaseName already exists');
                </script>
            ";
        } else {
            $createDbQuery = "CREATE DATABASE $databaseName";

            if ($db->query($createDbQuery)) {
                echo "
                <script>
                    alert('Created database $databaseName successfully');
                </script>
            ";
            } else {
                echo "
                <script>
                    alert('Creating database failed');
                </script>
            ";
            }
        }
    }   

    // Making arm_mo the current database
    {
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

    // Drop tables here
    {
        // $db->query("DROP TABLE Mastery");
    }

    // Creating the Meditation Stage table
    {
        $queryCreateMeditationStage= "CREATE TABLE Meditation_Stage(Stage_ID INT PRIMARY KEY AUTO_INCREMENT,
                                                                    GOAL VARCHAR(8000) NOT NULL)
                                    ";
        if(($db->query("SHOW TABLES LIKE 'Meditation_Stage'"))->num_rows>0){
            echo"
                <script>
                    alert('Table Meditation_Stage already exists')
                </script>
            ";
        }
        else{
            if($db->query($queryCreateMeditationStage)){
                echo"
                    <script>
                        alert('Created the table Meditation Stage succesfully!')
                    </script>
                ";
            }
            else{
                echo"
                    <script>
                        alert('Creation of the table meditation stage failed!')
                    </script>
                ";
            }

        }


    }

    // Creating the Meditator table
    {
        $queryCreateMeditator= "CREATE TABLE Meditator(Meditator_ID INT PRIMARY KEY AUTO_INCREMENT,
                                    Username VARCHAR(20) NOT NULL,
                                    Password VARCHAR(20)NOT NULL,
                                    EMAIL VARCHAR(20),
                                    Firstname VARCHAR(20) NOT NULL,
                                    Lastname VARCHAR(20) NOT NULL,
                                    Date_of_birth DATE,
                                    Stage_ID INT NOT NULL,
                                    FOREIGN KEY(Stage_ID) REFERENCES Meditation_Stage(Stage_ID))";
        $queryCheckIfMeditatorExists="SHOW TABLES LIKE 'Meditator'";
        if(($db->query($queryCheckIfMeditatorExists))->num_rows>0){
            echo"
            <script>
                alert('Table Meditator already exists!')
            </script>
        ";
        }
        else{
            if($db->query($queryCreateMeditator)){
                echo"
                    <script>
                        alert('Created the table Meditator successfully!')
                    </script>
                ";
            }
            else{
                echo"
                <script>
                    alert('Creating Meditator failed!')
                </script>
            ";
            }
        }
    }

    // Creating the obstacle table
    {
         $queryCreateObstacle= "CREATE TABLE Obstacle(Obstacle_ID INT PRIMARY KEY AUTO_INCREMENT,
                                                                    Description VARCHAR(8000) NOT NULL)
                                    ";
        if(($db->query("SHOW TABLES LIKE 'Obstacle'"))->num_rows>0){
            echo"
                <script>
                    alert('Table Obstacle already exists')
                </script>
            ";
        }
        else{
            if($db->query($queryCreateObstacle)){
                echo"
                    <script>
                        alert('Created the table Obstacle succesfully!')
                    </script>
                ";
            }
            else{
                echo"
                    <script>
                        alert('Creation of the table Obstacle failed!')
                    </script>
                ";
            }

        }

    }

    // Creating the mastery requirement table
    {
         $queryCreateMastery_Requirement= "CREATE TABLE Mastery_Requirement(Mastery_ID INT PRIMARY KEY AUTO_INCREMENT,
                                                                    Stage_ID INT NOT NULL,
                                                                    Prompt VARCHAR(8000),
                                                                    Correct_Value VARCHAR(8000),
                                                                    FOREIGN KEY (Stage_ID) REFERENCES Meditation_Stage(Stage_ID))";
        if(($db->query("SHOW TABLES LIKE 'Mastery_Requirement'"))->num_rows>0){
            echo"
                <script>
                    alert('Table Mastery_Requirement already exists')
                </script>
            ";
        }
        else{
            if($db->query($queryCreateMastery_Requirement)){
                echo"
                    <script>
                        alert('Created the table Mastery_Requirement succesfully!')
                    </script>
                ";
            }
            else{
                echo"
                    <script>
                        alert('Creation of the table Mastery_Requirement failed!')
                    </script>
                ";
            }

        }

    }

    // Creating the Skill table
    {
         $queryCreateSkill= "CREATE TABLE Skill(Skill_ID INT PRIMARY KEY AUTO_INCREMENT,
                                                Description VARCHAR(8000) NOT NULL)";

        if(($db->query("SHOW TABLES LIKE 'Skill'"))->num_rows>0){
            echo"
                <script>
                    alert('Table Skill already exists')
                </script>
            ";
        }
        else{
            if($db->query($queryCreateSkill)){
                echo"
                    <script>
                        alert('Created the table Skill succesfully!')
                    </script>
                ";
            }
            else{
                echo"
                    <script>
                        alert('Creation of the table Skill failed!')
                    </script>
                ";
            }

        }

    }

    // Creating the Intention table
    {
         $queryCreateIntention= "CREATE TABLE Intention(Intention_ID INT PRIMARY KEY AUTO_INCREMENT,
                                                                    Stage_ID INT NOT NULL,
                                                                    Description VARCHAR(8000) NOT NULL,
                                                                    FOREIGN KEY (Stage_ID) REFERENCES Meditation_Stage(Stage_ID))";
        if(($db->query("SHOW TABLES LIKE 'Intention'"))->num_rows>0){
            echo"
                <script>
                    alert('Table Intention already exists')
                </script>
            ";
        }
        else{
            if($db->query($queryCreateIntention)){
                echo"
                    <script>
                        alert('Created the table Intention succesfully!')
                    </script>
                ";
            }
            else{
                echo"
                    <script>
                        alert('Creation of the table Intention failed!')
                    </script>
                ";
            }

        }

    }

    // Creating the Session table
    {
         $queryCreateSession= "CREATE TABLE Session(Session_ID INT PRIMARY KEY AUTO_INCREMENT,
                                                                    Stage_ID INT NOT NULL,
                                                                    Meditator_ID INT NOT NULL,
                                                                    Start_Time DATETIME NOT NULL,
                                                                    End_Time DATETIME NOT NULL,
                                                                    FOREIGN KEY (Stage_ID) REFERENCES Meditation_Stage(Stage_ID),
                                                                    FOREIGN KEY (Meditator_ID) REFERENCES Meditator(Meditator_ID))";

        if(($db->query("SHOW TABLES LIKE 'Session'"))->num_rows>0){
            echo"
                <script>
                    alert('Table Session already exists')
                </script>
            ";
        }
        else{
            if($db->query($queryCreateSession)){
                echo"
                    <script>
                        alert('Created the table Session succesfully!')
                    </script>
                ";
            }
            else{
                echo"
                    <script>
                        alert('Creation of the table Session failed!')
                    </script>
                ";
            }

        }

    }

    // Creating the Antidote table
    {
       $queryCreateAntidote= "CREATE TABLE Antidote(Antidote_ID INT PRIMARY KEY AUTO_INCREMENT,
                                                                    Type VARCHAR(200) NOT NULL,
                                                                    Severity VARCHAR(100) NOT NULL,
                                                                    Antidote VARCHAR(8000) NOT NULL)";

        if(($db->query("SHOW TABLES LIKE 'Antidote'"))->num_rows>0){
            echo"
                <script>
                    alert('Table Antidote already exists')
                </script>
            ";
        }
        else{
            if($db->query($queryCreateAntidote)){
                echo"
                    <script>
                        alert('Created the table Antidote succesfully!')
                    </script>
                ";
            }
            else{
                echo"
                    <script>
                        alert('Creation of the table Antidote failed!')
                    </script>
                ";
            }

        } 
    }

    // Creating the Stage obstacle association table
    {
         $queryStage_Obstacle_Association= "CREATE TABLE Stage_Obstacle_Association(Obstacle_ID INT NOT NULL,
                                                                    Stage_ID INT NOT NULL,
                                                                    PRIMARY KEY (Stage_ID,Obstacle_ID),
                                                                    FOREIGN KEY (Stage_ID) REFERENCES Meditation_Stage(Stage_ID),
                                                                    FOREIGN KEY (Obstacle_ID) REFERENCES Obstacle(Obstacle_ID))";

        if(($db->query("SHOW TABLES LIKE 'Stage_Obstacle_Association'"))->num_rows>0){
            echo"
                <script>
                    alert('Table Stage_Obstacle_Association already exists')
                </script>
            ";
        }
        else{
            if($db->query($queryStage_Obstacle_Association)){
                echo"
                    <script>
                        alert('Created the table Stage_Obstacle_Association succesfully!')
                    </script>
                ";
            }
            else{
                echo"
                    <script>
                        alert('Creation of the table Stage_Obstacle_Association failed!')
                    </script>
                ";
            }

        }

    }

    // Creating the Stage Skill association table
    {
        $queryStage_Skill_Association= "CREATE TABLE Stage_Skill_Association(Skill_ID INT NOT NULL,
                                                                   Stage_ID INT NOT NULL,
                                                                   PRIMARY KEY (Stage_ID,Skill_ID),
                                                                   FOREIGN KEY (Stage_ID) REFERENCES Meditation_Stage(Stage_ID),
                                                                   FOREIGN KEY (Skill_ID) REFERENCES Skill(Skill_ID))";

       if(($db->query("SHOW TABLES LIKE 'Stage_Skill_Association'"))->num_rows>0){
           echo"
               <script>
                   alert('Table Stage_Skill_Association already exists')
               </script>
           ";
       }
       else{
           if($db->query($queryStage_Skill_Association)){
               echo"
                   <script>
                       alert('Created the table Stage_Skill_Association succesfully!')
                   </script>
               ";
           }
           else{
               echo"
                   <script>
                       alert('Creation of the table Stage_Skill_Association failed!')
                   </script>
               ";
           }

       }

    }
    
    // Checking foreign keys
    {
        
        $tableName = 'Stage_Skill_Association';  // The table name you want to check
        $databaseName = 'Arm_mo';  // The name of the database

        // Query to retrieve foreign key information for the specified table
        $query = "SELECT COLUMN_NAME, CONSTRAINT_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
                FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
                WHERE TABLE_NAME = '$tableName'
                    AND TABLE_SCHEMA = '$databaseName'
                    AND REFERENCED_TABLE_NAME IS NOT NULL";

        $result = $db->query($query);

        // Check if any foreign keys exist for the table
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                // Access the foreign key information
                $columnName = $row['COLUMN_NAME'];
                $constraintName = $row['CONSTRAINT_NAME'];
                $referencedTableName = $row['REFERENCED_TABLE_NAME'];
                $referencedColumnName = $row['REFERENCED_COLUMN_NAME'];

                // Output the foreign key details
                echo "Column: $columnName, Constraint: $constraintName, Referenced Table: $referencedTableName, Referenced Column: $referencedColumnName<br>";
            }
        } else {
            echo "No foreign keys found for the table.";
        }
                                        
    }

?>