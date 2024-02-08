<?php
// Mastery_Requirement.php

class Mastery_Requirement {
    public $Mastery_ID;
    public $Description;
    public $Stage;
   

    public static function getMastery_Requirement_Array($identifier) {
        include_once('../../Back-end/Connect.php');
        $con = new Connect;
        $db = $con->__getConnection();
        $db->query('USE Arm_mo_v2');
        
        // Query the database based on the identifier
        $query = "SELECT * FROM Mastery_Requirement WHERE Stage_ID = '$identifier'";
        $result = $db->query($query);
        $Mastery_Requirement_Array= Array();
        while($row = $result->fetch_assoc()){
            // Create a new Mastery_Requirement object and assign values from the query result
            $Mastery_Requirement = new Mastery_Requirement();
            $Mastery_Requirement->Description = $row['Description'];
            $Mastery_Requirement->Stage = $row['Stage_ID'];
            $Mastery_Requirement_Array[]=$Mastery_Requirement;
            
        }
        return $Mastery_Requirement_Array;
        
    }
    
    public static function getJavaScriptMastery_Requirement_Array($identifier) {
        $Mastery_Requirement = Mastery_Requirement::getMastery_Requirement_Array($identifier);
    
        // Convert the Mastery_Requirement object to a JSON string
        $Mastery_RequirementJson = json_encode($Mastery_Requirement);
    
        // Return the JavaScript code to create the JavaScript Mastery_Requirement object
        return $Mastery_RequirementJson;
    }
}

    
?>