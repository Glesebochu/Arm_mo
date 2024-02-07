<?php
// meditator.php

class Meditator {
    public $First_Name;
    public $Last_Name;
    public $Username;
    public $Password;
    public $Current_Stage_No;

    public static function getMeditator($identifier) {
        include_once('../../Back-end/Connect.php');
        $con = new Connect;
        $db = $con->__getConnection();
        $db->query('USE Arm_mo_v2');
        
        // Query the database based on the identifier
        $query = "SELECT First_Name, Last_Name, Username, Password, Stage_ID FROM Meditator WHERE Username = '$identifier'";
        $result = $db->query($query);
        $row = $result->fetch_assoc();
        
        // Create a new Meditator object and assign values from the query result
        $meditator = new Meditator();
        $meditator->First_Name = $row['First_Name'];
        $meditator->Last_Name = $row['Last_Name'];
        $meditator->Username = $row['Username'];
        $meditator->Password = $row['Password'];
        $meditator->Current_Stage_No = $row['Stage_ID'];
        
        return $meditator;
    }
    
    public static function getJavaScriptMeditator($identifier) {
        $meditator = Meditator::getMeditator($identifier);
    
        // Convert the Meditator object to a JSON string
        $meditatorJson = json_encode($meditator);
    
        // Return the JavaScript code to create the JavaScript Meditator object
        return $meditatorJson;
    }
}

    
?>