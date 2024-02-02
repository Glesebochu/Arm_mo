<?php
// process-login.php

// Retrieve the submitted form data
$password = $_POST['password'];
session_start();
$username = $_SESSION['UsernametoEdit'];
include('Connect.php');
$con = new Connect;
$db = $con->__getConnection();
$db->query('USE Arm_mo');
$queryCheckCredentials = "CALL CheckCredentials('$username', '$password', @p_exists)";
$db->query($queryCheckCredentials);
$result = $db->query("SELECT @p_exists");
$row = $result->fetch_assoc();
$count = $row['@p_exists'];

if ($count == 1) {
    $queryDeleteAccount = "CALL DeleteAccount('$username')";
    $db->query($queryDeleteAccount);
    $successMessage = 'We are sorry to see you go!';
    echo "
        <script>
            alert('$successMessage');
            window.top.location.href = '../Front-end/Signup/signup.html';
        </script>
    ";
    exit;
} else {
    $errorMessage = 'Invalid password';
    echo "
        <script>
            alert('$errorMessage');
        </script>
    ";
    exit;
}
      
?>