<?php
// meditator.php

class Meditator {
    public $First_Name;
    public $Last_Name;
    public $Username;
    public $Password;
    public $Current_Stage_No;
}

function getMeditator($identifier) {
    include_once('Connect.php');
    $con = new Connect;
    $db = $con->__getConnection();
    $db->query('USE Arm_mo');
    
    // Query the database based on the identifier
    $query = "SELECT Firstname, Lastname, Username, Password, Stage_ID FROM Meditator WHERE Username = '$identifier'";
    $result = $db->query($query);
    $row = $result->fetch_assoc();
    
    // Create a new Meditator object and assign values from the query result
    $meditator = new Meditator();
    $meditator->First_Name = $row['Firstname'];
    $meditator->Last_Name = $row['Lastname'];
    $meditator->Username = $row['Username'];
    $meditator->Password = $row['Password'];
    $meditator->Current_Stage_No = $row['Stage_ID'];
    
    return $meditator;
}

function getJavaScriptMeditator($identifier) {
    $meditator = getMeditator($identifier);

    // Convert the Meditator object to a JSON string
    $meditatorJson = json_encode($meditator);

    // Return the JavaScript code to create the JavaScript Meditator object
    // return "new Meditator($meditatorJson)";
    return $meditatorJson;
}
    
?>