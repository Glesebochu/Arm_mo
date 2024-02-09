<?php
// Obstacle.php

class Obstacle {
    public $Description;
   
    public static function getObstacle($identifier) {
        include_once(__DIR__ . '/../Connect.php');
        $con = new Connect;
        $db = $con->__getConnection();
        $db->query('USE Arm_mo_v2');
        
        // Query the database based on the identifier
        $query = "SELECT Description FROM Obstacle WHERE Obstacle_ID = '$identifier'";
        $result = $db->query($query);
        $row = $result->fetch_assoc();
        
        // Create a new Obstacle object and assign values from the query result
        $Obstacle = new Obstacle();
        $Obstacle->Description = $row['Description'];
            
        return $Obstacle;
    }
    
    public static function getJavaScriptObstacle($identifier) {
        $Obstacle = Obstacle::getObstacle($identifier);
    
        // Convert the Obstacle object to a JSON string
        $ObstacleJson = json_encode($Obstacle);
    
        // Return the JavaScript code to create the JavaScript Obstacle object
        return $ObstacleJson;
    }
    public static function getObstacleArray($stageID) {
        include_once(__DIR__ . '/../Connect.php');
        $con = new Connect;
        $db = $con->__getConnection();
        $db->query('USE Arm_mo_v2');
        
        // Query the database based on the stage ID
        $query = "SELECT o.Description FROM Obstacle AS o
                  INNER JOIN stage_obstacle_association AS soa ON o.Obstacle_ID = soa.Obstacle_ID
                  WHERE soa.Stage_ID = '$stageID'";
        $result = $db->query($query);
        
        // Create an array to store the Obstacle objects
        $obstacleArray = array();
        
        // Iterate over the query results and create Obstacle objects
        while ($row = $result->fetch_assoc()) {
            $obstacle = new Obstacle();
            $obstacle->Description = $row['Description'];
            
            // Add the Obstacle object to the array
            $obstacleArray[] = $obstacle;
        }
        
        return $obstacleArray;
    }
    public static function getJavaScriptObstacleArray($stageID) {
        $obstacleArray = Obstacle::getObstacleArray($stageID);
        
        // Convert each Obstacle object to a JSON string
        $obstacleJsonArray = array();
        foreach ($obstacleArray as $obstacle) {
            $obstacleJson = json_encode($obstacle);
            $obstacleJsonArray[] = $obstacleJson;
        }
        
        // Return the JavaScript code to create the JavaScript obstacle array
        return $obstacleJsonArray;
    }
}

    
?>