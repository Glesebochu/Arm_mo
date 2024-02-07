<?php
// process-login.php

// Retrieve the submitted form data
$oldpassword = $_POST['password'];
$newpassword = $_POST['newpassword'];
$cpassword= $_POST['confirmpassword'];


if ($cpassword === $newpassword) {
    session_start();
    $username = $_SESSION['UsernametoEdit'];
    include('Connect.php');
    $con = new Connect;
    $db = $con->__getConnection();
    $db->query('USE Arm_mo_v2');
    $queryCheckCredentials = "CALL CheckCredentials('$username', '$oldpassword', @p_exists)";
    $db->query($queryCheckCredentials);
    $result = $db->query("SELECT @p_exists");
    $row = $result->fetch_assoc();
    $count = $row['@p_exists'];

    if ($count == 1) {
        $queryEditPassword = "CALL EditPassword('$username', '$newpassword')";
        $db->query($queryEditPassword);
        $successMessage = 'Password changed successfully';
        echo "
            <script>
                alert('$successMessage');
                window.top.location.href = '../Front-end/Login/login.html';
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
    
} else {
   
   echo"
       <script>
           alert('Passwords do not Match!');
       </script>
   ";
   exit;
}   
?>