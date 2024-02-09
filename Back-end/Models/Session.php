<?php
// Session.php

include_once(__DIR__ . '/../Connect.php'); // Include the Connect.php file
include_once('Stage.php'); // Include the stage.php file
include_once('Meditator.php');
include_once('AhaMoment.php');
include_once('Step.php');

class Session {
    public $Session_ID;
    public $Meditator;
    public $Start_Date_Time;
    public $End_Date_Time;
    public $Practiced_Stages; 
    public $AhaMoments;
    public $Steps;
    public $Newly_Mastered_Stages;

    public static function getSession($session_ID) {
        $con = new Connect;
        $db = $con->__getConnection();
        $db->query('USE Arm_mo_v2');
        
        // Query the database based on the identifier
        $query = "SELECT * FROM Session WHERE Session_ID = '$session_ID'";
        $result = $db->query($query);
        $row = $result->fetch_assoc();
        
        // Create a new Session object and assign values from the query result
        $Session = new Session();
        $Session->Session_ID = $row['Session_ID'];
        $Session->Meditator = Meditator::getMeditatorByID($row['Meditator_ID']);
        $Session->Start_Date_Time = $row['Start_Date_Time'];
        $Session->End_Date_Time = $row['End_Date_Time'];
        $Session->Practiced_Stages = self::getPracticedStages($row['Session_ID']);
        $Session->AhaMoments = AhaMoment::getAhaMomentArray($session_ID);
        $Session->Steps = Step::getStepArray($session_ID);
        
        return $Session;
    }
    
    public static function getJavaScriptSession($session_ID) {
        $Session = self::getSession($session_ID);
    
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
        $query = "SELECT s.Stage_ID FROM Stage AS s
                  INNER JOIN Practiced_Stages AS ps ON s.Stage_ID = ps.Stage_ID
                  WHERE ps.Session_ID = '$Session_ID'";
        $result = $db->query($query);
        
        // Create an array to store the stage IDs
        $stages = array();
        
        // Iterate over the query results and add stage IDs to the array
        while ($row = $result->fetch_assoc()) {
            $stages[] = Stage::getStage($row['Stage_ID']);
        }
        
        return $stages;
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
            // Add the Session object to the array
            $SessionArray[] = self::getSession($row['Session_ID']);
        }
        
        return $SessionArray;
    }
    
    public static function getJavaScriptSessionArray($Meditator_ID) {
        $SessionArray = self::getSessionArray($Meditator_ID);
        
        // // Convert each Session object to a JSON string
        // $SessionJsonArray = array();
        // foreach ($SessionArray as $Session) {
        //     $SessionJson = json_encode($Session);
        //     $SessionJsonArray[] = $SessionJson;
        // }
        
        // Return the JavaScript code to create the JavaScript Session array
        return $SessionArray;
    }
}
?>