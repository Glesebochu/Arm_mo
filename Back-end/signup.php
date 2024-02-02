<?php
// process-login.php

// Retrieve the submitted form data
$username = $_POST['username'];
$password = $_POST['pwdInput'];
$cpassword= $_POST['cpwdInput'];
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$dob = $_POST['dob'];

if ($cpassword === $password) {
    session_start();
    $_SESSION['UsernametoEdit']=$username;
    include('Connect.php');
    $con = new Connect;
    $db = $con->__getConnection();
    $db->query('USE Arm_mo');
    $querycheckDuplicateUsernames = "CALL checkDuplicateUsernames('$username', @p_exists)";
    $db->query($querycheckDuplicateUsernames);
    $result = $db->query("SELECT @p_exists");
    $row = $result->fetch_assoc();
    $count = $row['@p_exists'];

    if ($count == 0) {
        $queryInsertMeditator = "call AddMeditator('$username','$firstname','$lastname','$password','$dob',1)";
        $db->query($queryInsertMeditator);
        header('Location: ../Front-end/home-settings/home-page.php');
        exit;
    } else {
        $errorMessage = 'A user with that exact username exists!';  
        header("Location: ../Front-end/Signup/signup.html?error=".urlencode($errorMessage));
        exit;
    }
}
else {
    $errorMessage = 'Passwords do not match!';  
    header("Location: ../Front-end/Signup/signup.html?error=".urlencode($errorMessage));
    exit;
}
?>