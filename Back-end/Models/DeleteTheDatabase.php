<?php
// We need to create the database if it already exists, do not create it
include_once('../../Back-end/Connect.php');
$con = new Connect();
$db = $con->__getConnection();

// Dropping the old database
{
    $olddatabaseName = 'Arm_mo_v2';

    // Check if the database exists
    $queryDbExists = "SHOW DATABASES LIKE '$olddatabaseName'";
    $resCheckDBExists = $db->query($queryDbExists);

    if ($resCheckDBExists->num_rows > 0) {
        // Drop the database
        $dropDbQuery = "DROP DATABASE $olddatabaseName";

        if ($db->query($dropDbQuery)) {
            echo "
                <script>
                    alert('Dropped database $olddatabaseName successfully');
                </script>
            ";
        } else {
            echo "
                <script>
                    alert('Dropping database $olddatabaseName failed');
                </script>
            ";
        }
    } else {
        echo "
            <script>
                alert('Database $olddatabaseName does not exist');
            </script>
        ";
    }
}

    
?>