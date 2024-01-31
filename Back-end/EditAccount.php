<?php
    include_once('./Connect.php');
    $con = new Connect;
    $db = $con->__getConnection();
    session_start();

    if (isset($_SESSION['UsernametoEdit'])) {
        $UsernametoEdit = $_SESSION['UsernametoEdit'];
        // Retrieve the submitted form data
        $username = $_POST['username'];
        $firstname = $_POST['firstname'];
        $lastname = $_POST['lastname'];
        $dob = $_POST['dob'];
        
        // handling the profile picture
        $profilepic = '';
        if (isset($_FILES['profilepic']) && $_FILES['profilepic']['error'] === UPLOAD_ERR_OK) {
            $tempFilePath = $_FILES['profilepic']['tmp_name'];
            $fileName = $_FILES['profilepic']['name'];
            $profilepic = './profilePic/' . $fileName; // Save in the "profilePic" folder
            move_uploaded_file($tempFilePath, $profilepic);
        }

        $db->query('USE Arm_mo');
        $querycheckDuplicateUsernames = "CALL checkDuplicateUsernames('$username', @p_exists)";
        $db->query($querycheckDuplicateUsernames);
        $result = $db->query("SELECT @p_exists");
        $row = $result->fetch_assoc();
        $count = $row['@p_exists'];

        if ($count == 0) {
            $queryEditAccount = "CALL EditAccount('$UsernametoEdit', '$username', '$firstname', '$lastname', '$dob', '$profilepic')";
            $_SESSION['UsernametoEdit']=$username;
            $_SESSION['profilepic']=$profilepic;
            $db->query($queryEditAccount);
            echo "<script>alert('You have successfully edited your Account!');</script>";
            echo "<script>window.top.location.reload();</script>";
            exit;
        }
        else{
            echo "<script>alert('Edit was unsucessfull a user with that account already exists!');</script>";
            echo "<script>window.top.location.reload();</script>";
            exit; 
        }
    }

    else {
        echo "<script>alert('Username to edit unavailable!');</script>";
    }
?>