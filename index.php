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
?>