<?php
// Intention.php

class Intention {
    public $Description;
    public $Stage;
   

    public static function getIntention($identifier) {
        include_once('../../Back-end/Connect.php');
        $con = new Connect;
        $db = $con->__getConnection();
        $db->query('USE Arm_mo');
        
        // Query the database based on the identifier
        $query = "SELECT Description,Stage_ID FROM Intention WHERE Stage_ID = '$identifier'";
        $result = $db->query($query);
        $row = $result->fetch_assoc();
        
        // Create a new Intention object and assign values from the query result
        $Intention = new Intention();
        $Intention->Description = $row['Description'];
        $Intention->Stage = $row['Stage_ID'];
        return $Intention;
    }
    
    public static function getJavaScriptIntention($identifier) {
        $Intention = Intention::getIntention($identifier);
    
        // Convert the Intention object to a JSON string
        $IntentionJson = json_encode($Intention);
    
        // Return the JavaScript code to create the JavaScript Intention object
        return $IntentionJson;
    }
}

    
?>