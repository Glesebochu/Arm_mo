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
  // Set the session variables
  $_SESSION['UsernametoEdit'] = $username;
  // Create a Meditator object and store its attributes in the session array
  $queryMeditator = "SELECT Firstname, Lastname, Password, Stage_ID FROM Meditator WHERE Username = '$username'";
  $result = $db->query($queryMeditator);
  $row = $result->fetch_assoc();
  $_SESSION['First_Name'] = $row['Firstname'];
  $_SESSION['Last_Name'] = $row['Lastname'];
  $_SESSION['Password'] = $row['Password'];
  $_SESSION['stage'] = $row['Stage_ID'];

  header("Location: ../Front-end/home-settings/home-page.php?stage=" . urlencode($_SESSION['stage']));
  exit;

} else {
  $errorMessage = 'Invalid username or password';
  header("Location: ../Front-end/Login/login.html?error=" . urlencode($errorMessage));
  exit;
}
?>