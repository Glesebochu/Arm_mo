<?php
    // We need to create the database if it already exists, do not create it
    include_once('Connect.php');
    $con = new Connect();
    $db = $con->__getConnection();

    // Creating the database
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

    // Making arm_mo the current database
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

    // Adding the Meditator table
    $queryCreateMeditator= "CREATE TABLE Meditator(Meditator_ID INT PRIMARY KEY AUTO_INCREMENT,
                                Username VARCHAR(20),
                                Password VARCHAR(20),
                                EMAIL VARCHAR(20),Firstname VARCHAR(20),
                                Lastname VARCHAR(20),Date_of_birth DATE)";
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
                                

?>