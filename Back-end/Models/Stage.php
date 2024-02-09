<?php
// Stage.php

class Stage {
    public $Stage_ID;
    public $Goal;
    public $Intentions;
    public $Obstacles;
    public $Skills;
    public $MasteryRequirements;
    public $Is_Mastered;
       
    public static function getStage($identifier) {
        include_once(__DIR__ . '/../Connect.php');
        include_once('Intention.php');
        include_once('Obstacle.php');
        include_once('Skill.php');
        include_once('MasteryRequirement.php');
        $con = new Connect;
        $db = $con->__getConnection();
        $db->query('USE Arm_mo_v2');
        
        // Query the database based on the identifier
        $query = "SELECT * FROM Stage WHERE Stage_ID = '$identifier'";
        $result = $db->query($query);
        $row = $result->fetch_assoc();
        
        // Create a new Stage object and assign values from the query result
        $Stage = new Stage();
        $Stage->Stage_ID = $row['Stage_ID'];
        $Stage->Goal = $row['Goal'];
        $Stage->Intentions = Intention::getIntentionArray($identifier);
        $Stage->Obstacles = Obstacle::getObstacleArray($identifier);
        $Stage->Skills = Skill::getSkillArray($identifier);
        $Stage->MasteryRequirements = MasteryRequirement::getMasteryRequirementArray($identifier);
        $Stage->Is_Mastered = $row['Is_Mastered'];
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