<?php
// process-login.php

// Start the session
session_start(); 

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
  // Set the session variable
  $_SESSION['UsernametoEdit'] = $username;
  $queryStageID = "SELECT Stage_ID FROM Meditator WHERE Username = '$username'";
  $result = $db->query($queryStageID);
  $row = $result->fetch_assoc();
  $stage=$row['Stage_ID'];
  $_SESSION['stage']=$stage;
  header("Location: ../Front-end/home-settings/home-page.php?stage=" . urlencode($stage));
  exit;
} else {
  $errorMessage = 'Invalid username or password';
  header("Location: ../Front-end/Login/login.html?error=" . urlencode($errorMessage));
  exit;
}
?>