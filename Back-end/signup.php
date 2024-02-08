<?php
// process-login.php

// Start output buffering
ob_start();

// Retrieve the submitted form data
$username = $_POST['username'];
$password = $_POST['pwdInput'];
$cpassword = $_POST['cpwdInput'];
$First_Name = $_POST['firstname'];
$Last_Name = $_POST['lastname'];
$dob = $_POST['dob'];

if ($cpassword === $password) {
    session_start();
    $_SESSION['UsernametoEdit'] = $username;
    include('Connect.php');
    $con = new Connect;
    $db = $con->__getConnection();

    // Check if the database "Arm_mo_v2" exists
    $db->query('USE information_schema');
    $result = $db->query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'Arm_mo_v2'");

    if ($result->num_rows > 0) {
        $db->query('USE Arm_mo_v2');
    } else {
        // The database does not exist
        // Run index.php and populateTheDatabase.php to create and populate the database
        require_once 'index.php';
        $db->query('USE Arm_mo_v2');
    }

    // Continue with the rest of the code
    $querycheckDuplicateUsernames = "CALL checkDuplicateUsernames('$username', @p_exists)";
    $db->query($querycheckDuplicateUsernames);
    $result = $db->query("SELECT @p_exists");
    $row = $result->fetch_assoc();
    $count = $row['@p_exists'];

    if ($count == 0) {
        $queryInsertMeditator = "CALL AddMeditator('$username','$First_Name','$Last_Name','$password','$dob',1)";
        $db->query($queryInsertMeditator);
        $_SESSION['stage'] = 1;
        require_once 'populateTheDatabase.php';
        header('Location: ../Front-end/Login/login.html');
        exit;
    } else {
        $errorMessage = 'A user with that exact username exists!';
        header("Location: ../Front-end/Signup/signup.html?error=" . urlencode($errorMessage));
        exit;
    }
} else {
    $errorMessage = 'Passwords do not match!';
    header("Location: ../Front-end/Signup/signup.html?error=" . urlencode($errorMessage));
    exit;
}

// Send the output buffer to the browser
ob_end_flush();
?>