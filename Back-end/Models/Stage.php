<?php
// Stage.php

class Stage {
    public $Stage_ID;
    public $Goal;
       
    public static function getStage($identifier) {
        include_once(__DIR__ . '/../Connect.php');
        $con = new Connect;
        $db = $con->__getConnection();
        $db->query('USE Arm_mo_v2');
        
        // Query the database based on the identifier
        $query = "SELECT Stage_ID,Goal FROM Meditation_Stage WHERE Stage_ID = '$identifier'";
        $result = $db->query($query);
        $row = $result->fetch_assoc();
        
        // Create a new Stage object and assign values from the query result
        $Stage = new Stage();
        $Stage->Goal = $row['Goal'];
        $Stage->Stage_ID = $row['Stage_ID'];
        return $Stage;
    }
    
    public static function getJavaScriptStage($identifier) {
        $Stage = Stage::getStage($identifier);
    
        // Convert the Stage object to a JSON string
        $StageJson = json_encode($Stage);
    
        // Return the JavaScript code to create the JavaScript Stage object
        return $StageJson;
    }
}

    
?>