<?php
// process-login.php

// Retrieve the submitted form data
$username = $_POST['username'];
$password = $_POST['pwdInput'];
$cpassword= $_POST['cpwdInput'];
$First_Name = $_POST['First_Name'];
$Last_Name = $_POST['Last_Name'];
$dob = $_POST['dob'];

if ($cpassword === $password) {
    session_start();
    $_SESSION['UsernametoEdit']=$username;
    include('Connect.php');
    $con = new Connect;
    $db = $con->__getConnection();
    $db->query('USE Arm_mo_v2');
    $querycheckDuplicateUsernames = "CALL checkDuplicateUsernames('$username', @p_exists)";
    $db->query($querycheckDuplicateUsernames);
    $result = $db->query("SELECT @p_exists");
    $row = $result->fetch_assoc();
    $count = $row['@p_exists'];

    if ($count == 0) {
        $queryInsertMeditator = "call AddMeditator('$username','$First_Name','$Last_Name','$password','$dob',1)";
        $db->query($queryInsertMeditator);
        header('Location: ../Front-end/home-settings/home-page.php');
        $_SESSION['stage']=1;
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