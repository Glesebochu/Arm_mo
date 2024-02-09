<?php
// Intention.php

class Intention {
    public $Intention_ID;
    public $Description;
   
    public static function getIntention($identifier){
        include_once(__DIR__ . '/../Connect.php');
        $con = new Connect;
        $db = $con->__getConnection();
        $db->query('USE Arm_mo_v2');

        // Query the database based on the identifier
        $query = "SELECT * FROM Intention WHERE Intention_ID = '$identifier'";
        $result = $db->query($query);
        $row = $result->fetch_assoc();

        // Create a new Intention object and assign values from the query result
        $Intention = new Intention();
        $Intention->Intention_ID = $row['Intention_ID'];
        $Intention->Description = $row['Description'];
        
        return $Intention;
    }

    public static function getJavaScriptIntention($identifier) {
        $Intention = self::getIntention($identifier);
    
        // Convert the Intention object to a JSON string
        $IntentionJson = json_encode($Intention);
    
        // Return the JavaScript code to create the JavaScript Intention object
        return $IntentionJson;
    }

    public static function getIntentionArray($identifier) {
        include_once(__DIR__ . '/../Connect.php');
        $con = new Connect;
        $db = $con->__getConnection();
        $db->query('USE Arm_mo_v2');
        
        // Query the database based on the identifier
        $query = "SELECT * FROM Intention WHERE Stage_ID = '$identifier'";
        $result = $db->query($query);
        $Intention_Array= Array();
        while($row = $result->fetch_assoc()){
            $Intention_Array[] = self::getIntention($row['Intention_ID']);
        }
        return $Intention_Array;
    }
    
    public static function getJavaScriptIntentionArray($identifier) {
        $Intention = Intention::getIntentionArray($identifier);
    
        // Convert the Intention object to a JSON string
        $IntentionJson = json_encode($Intention);
    
        // Return the JavaScript code to create the JavaScript Intention object
        return $IntentionJson;
    }
}

    
?>