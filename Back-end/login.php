<?php
// process-login.php

// Retrieve the submitted form data
$username = $_POST['username'];
$password = $_POST['password'];

if ($username === 'admin@gmail.com' && $password === 'password') {
  header('Location: ../Front-end/home-settings/home-page.html');
  exit;
} else {
   $errorMessage = 'Invalid username or password';  
   header("Location: ../Front-end/About_us-login-signup/login.html?error=".urlencode($errorMessage));
   exit;
}
?>
