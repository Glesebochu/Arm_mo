<?php
// process-login.php

// Retrieve the submitted form data
$username = $_POST['username'];
$password = $_POST['password'];
$cpassword= $_POST['cpassword'];
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$dob = $_POST['dob'];

if ($cpassword === $password) {
    include('Connect.php');
    $con = new Connect;
    $db = $con->__getConnection();
    $db->query('USE Arm_mo');
    $queryInsertMeditator = "call AddMeditator('$username','$firstname','$lastname','$password','$dob',1)";
    $db->query($queryInsertMeditator);
    header('Location: ../Front-end/home-settings/home-page.html');
    exit;
} else {
   $errorMessage = 'Passwords do not match!';  
   header("Location: ../Front-end/About_us-login-signup/signup.html?error=".urlencode($errorMessage));
   exit;
}
?>