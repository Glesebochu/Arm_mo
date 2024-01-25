<?php
// process-login.php

// Retrieve the submitted form data
$username = $_POST['username'];
$password = $_POST['password'];
include_once('Connect.php');
$con = new Connect;
$db = $con->__getConnection();
$db->query('USE Arm_mo');
$queryCheckCredentials = "CALL CheckCredentials('$username', '$password', @p_exists)";
$db->query($queryCheckCredentials);
$result = $db->query("SELECT @p_exists");
$row = $result->fetch_assoc();
$count = $row['@p_exists'];

if ($count == 1) {
  header('Location: ../Front-end/home-settings/home-page.html');
  exit;
} else {
  $errorMessage = 'Invalid username or password';  
  header("Location: ../Front-end/About_us-login-signup/login.html?error=" . urlencode($errorMessage));
  exit;
}
?>
