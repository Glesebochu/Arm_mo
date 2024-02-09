<?php
// Session.php

include_once(__DIR__ . '/../Connect.php'); // Include the Connect.php file
include_once('Stage.php'); // Include the stage.php file

class Session {
    public $Session_ID;
    public $Meditator_ID;
    public $Start_Time;
    public $End_Time;
    public $Practiced_Stages; // New attribute to hold the array of practiced stages

    public static function getSession($identifier) {
        $con = new Connect;
        $db = $con->__getConnection();
        $db->query('USE Arm_mo_v2');
        
        // Query the database based on the identifier
        $query = "SELECT * FROM Session WHERE Session_ID = '$identifier'";
        $result = $db->query($query);
        $row = $result->fetch_assoc();
        
        // Create a new Session object and assign values from the query result
        $Session = new Session();
        $Session->Session_ID = $row['Session_ID'];
        $Session->Meditator_ID = $row['Meditator_ID'];
        $Session->Session_ID = $row['Session_ID'];
        $Session->Start_Time = $row['Start_Time'];
        $Session->End_Time = $row['End_Time'];

        // Populate the practiced stages array
        $Session->Practiced_Stages = self::getPracticedStages($Session->Session_ID);
        
        return $Session;
    }
    
    public static function getJavaScriptSession($identifier) {
        $Session = self::getSession($identifier);
    
        // Convert the Session object to a JSON string
        $SessionJson = json_encode($Session);
    
        // Return the JavaScript code to create the JavaScript Session object
        return $SessionJson;
    }
    
    public static function getPracticedStages($Session_ID) {
        $con = new Connect;
        $db = $con->__getConnection();
        $db->query('USE Arm_mo_v2');
        
        // Query the database based on the stage ID
        $query = "SELECT s.Stage_ID FROM Meditation_Stage AS s
                  INNER JOIN Practiced_Stages AS ps ON s.Stage_ID = ps.Stage_ID
                  WHERE ps.Session_ID = '$Session_ID'";
        $result = $db->query($query);
        
        // Create an array to store the stage IDs
        $stageIDs = array();
        
        // Iterate over the query results and add stage IDs to the array
        while ($row = $result->fetch_assoc()) {
            $stageID = $row['Stage_ID'];
            $stageIDs[] = $stageID;
        }
        
        return $stageIDs;
    }
    
    public static function getSessionArray($Meditator_ID) {
        $con = new Connect;
        $db = $con->__getConnection();
        $db->query('USE Arm_mo_v2');
        
        // Query the database based on the Meditator ID
        $query = "SELECT * FROM Session
                  WHERE Meditator_ID = '$Meditator_ID'";
        $result = $db->query($query);
        
        // Create an array to store the Session objects
        $SessionArray = array();
        
        // Iterate over the query results and create Session objects
        while ($row = $result->fetch_assoc()) {
            $Session = new Session();
            $Session->Session_ID = $row['Session_ID'];
            $Session->Meditator_ID = $row['Meditator_ID'];
            $Session->Session_ID = $row['Session_ID'];
            $Session->Start_Time = $row['Start_Time'];
            $Session->End_Time = $row['End_Time'];

            // Populate the practiced stages array
            $Session->Practiced_Stages = self::getPracticedStages($Session->Session_ID);

            // Add the Session object to the array
            $SessionArray[] = $Session;
        }
        
        return $SessionArray;
    }
    
    public static function getJavaScriptSessionArray($Meditator_ID) {
        $SessionArray = self::getSessionArray($Meditator_ID);
        
        // Convert each Session object to a JSON string
        $SessionJsonArray = array();
        foreach ($SessionArray as $Session) {
            $SessionJson = json_encode($Session);
            $SessionJsonArray[] = $SessionJson;
        }
        
        // Return the JavaScript code to create the JavaScript Session array
        return $SessionJsonArray;
    }
}
?>