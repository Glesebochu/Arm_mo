<?php
// MasteryRequirement.php

class MasteryRequirement {
    public $Mastery_ID;
    public $Description;
    public $Stage;
   

    public static function getMasteryRequirement_Array($identifier) {
        include_once('../../Back-end/Connect.php');
        $con = new Connect;
        $db = $con->__getConnection();
        $db->query('USE Arm_mo_v2');
        
        // Query the database based on the identifier
        $query = "SELECT * FROM Mastery_Requirement WHERE Stage_ID = '$identifier'";
        $result = $db->query($query);
        $MasteryRequirement_Array= Array();
        while($row = $result->fetch_assoc()){
            // Create a new MasteryRequirement object and assign values from the query result
            $MasteryRequirement = new MasteryRequirement();
            $MasteryRequirement->Mastery_ID = $row['Mastery_ID'];
            $MasteryRequirement->Description = $row['Description'];
            $MasteryRequirement->Stage = $row['Stage_ID'];
            $MasteryRequirement_Array[]=$MasteryRequirement;
            
        }
        return $MasteryRequirement_Array;
        
    }
    
    public static function getJavaScriptMasteryRequirement_Array($identifier) {
        $MasteryRequirement = MasteryRequirement::getMasteryRequirement_Array($identifier);
    
        // Convert the MasteryRequirement object to a JSON string
        $MasteryRequirementJson = json_encode($MasteryRequirement);
    
        // Return the JavaScript code to create the JavaScript MasteryRequirement object
        return $MasteryRequirementJson;
    }
}

    
?>