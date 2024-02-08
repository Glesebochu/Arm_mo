<?php
// Session.php

class Session {
    public $Session_ID;
    public $Meditator_ID;
    public $Start_Time;
    public $End_Time;

    public static function getSession($identifier) {
        include_once('../../Back-end/Connect.php');
        $con = new Connect;
        $db = $con->__getConnection();
        $db->query('USE Arm_mo_v2');
        
        // Query the database based on the identifier
        $query = "SELECT * FROM Session WHERE Session_ID = '$identifier'";
        $result = $db->query($query);
        $row = $result->fetch_assoc();
        
        // Create a new Session object and assign values from the query result
        $Session = new Session();
        $Session->Meditator_ID = $row['Meditator_ID'];
        $Session->Session_ID = $row['Session_ID'];
        $Session->Start_Time = $row['Start_Time'];
        $Session->End_Time = $row['End_Time'];
        return $Session;
    }
    
    public static function getJavaScriptSession($identifier) {
        $Session = Session::getSession($identifier);
    
        // Convert the Session object to a JSON string
        $SessionJson = json_encode($Session);
    
        // Return the JavaScript code to create the JavaScript Session object
        return $SessionJson;
    }
    public static function getSessionArray($Meditator_ID) {
        include_once('../../Back-end/Connect.php');
        $con = new Connect;
        $db = $con->__getConnection();
        $db->query('USE Arm_mo_v2');
        
        // Query the database based on the stage ID
        $query = "SELECT * FROM Session
                  WHERE Meditator_ID = '$Meditator_ID'";
        $result = $db->query($query);
        
        // Create an array to store the Session objects
        $SessionArray = array();
        
        // Iterate over the query results and create Session objects
        while ($row = $result->fetch_assoc()) {
            $Session = new Session();
            $Session->Meditator_ID = $row['Meditator_ID'];
            $Session->Session_ID = $row['Session_ID'];
            $Session->Start_Time = $row['Start_Time'];
            $Session->End_Time = $row['End_Time'];

            // Add the Session object to the array
            $SessionArray[] = $Session;
        }
        
        return $SessionArray;
    }
    public static function getJavaScriptSessionArray($Session_ID) {
        $SessionArray = Session::getSessionArray($Session_ID);
        
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