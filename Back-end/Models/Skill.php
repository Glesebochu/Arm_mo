<?php
// Skill.php

class Skill {
    public $Skill_ID;
    public $Description;
   
    public static function getSkill($identifier) {
        include_once(__DIR__ . '/../Connect.php');
        $con = new Connect;
        $db = $con->__getConnection();
        $db->query('USE Arm_mo_v2');
        
        // Query the database based on the identifier
        $query = "SELECT Description FROM Skill WHERE Skill_ID = '$identifier'";
        $result = $db->query($query);
        $row = $result->fetch_assoc();
        
        // Create a new Skill object and assign values from the query result
        $skill = new Skill();
        $skill->Skill_ID = $row['Skill_ID'];
        $skill->Description = $row['Description'];
            
        return $skill;
    }
    
    public static function getJavaScriptSkill($identifier) {
        $Skill = Skill::getSkill($identifier);
    
        // Convert the Skill object to a JSON string
        $SkillJson = json_encode($Skill);
    
        // Return the JavaScript code to create the JavaScript Skill object
        return $SkillJson;
    }
    public static function getSkillArray($stageID) {
        include_once(__DIR__ . '/../Connect.php');
        $con = new Connect;
        $db = $con->__getConnection();
        $db->query('USE Arm_mo_v2');
        
        // Query the database based on the stage ID
        $query = "SELECT s.Description FROM Skill AS s
                  INNER JOIN stage_Skill_association AS ssa ON s.Skill_ID = ssa.Skill_ID
                  WHERE ssa.Stage_ID = '$stageID'";
        $result = $db->query($query);
        
        // Create an array to store the Skill objects
        $skillArray = array();
        
        // Iterate over the query results and create Skill objects
        while ($row = $result->fetch_assoc()) {
            $skill = new Skill();
            $skill->Skill_ID = $row['Skill_ID'];
            $skill->Description = $row['Description'];
            
            // Add the Skill object to the array
            $skillArray[] = $skill;
        }
        
        return $skillArray;
    }
    public static function getJavaScriptSkillArray($stageID) {
        $SkillArray = Skill::getSkillArray($stageID);
        
        // Return the JavaScript code to create the JavaScript Skill array
        return $SkillArray;
    }
}

    
?>