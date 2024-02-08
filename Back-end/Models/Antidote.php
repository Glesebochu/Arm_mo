<?php

class AntidoteType{
    const Dullness = "Dullness";
    const Agitation = "Agitation"; 
}
class SeverityType{
    const Mild = "Mild";
    const Moderate = "Moderate";
    const Severe = "Severe";
}

class Antidote{
    public $Antidote_ID;
    public $Type;
    public $Severity;
    public $Description;

    public static function getAntidote($identifier){
        // Connect to the database
        include_once('../../Back-end/Connect.php');
        $con = new Connect;
        $db = $con->__getConnection();
        $db->query('USE Arm_mo_v2');

        /// Query the database based on the identifier
        $query = "SELECT * FROM Antidote WHERE Antidote_ID = '$identifier'";
        $result = $db->query($query);
        $row = $result->fetch_assoc();

        // Create a new object and assign values from the query result
        $antidote = new Antidote();
        $antidote->Antidote_ID = $row['Antidote_ID'];
        $antidote->Type = $row['Type'];
        $antidote->Severity = $row['Severity'];
        $antidote->Description = $row['Description'];

        return $antidote;
    }

    public static function getJavaScriptAntidote($identifier) {
        $antidote = Antidote::getAntidote($identifier);
    
        // Convert the obser$antidote object to a JSON string
        $antidoteJson = json_encode($antidote);
    
        // Return the JavaScript code to create the JavaScript obser$antidote object
        return $antidoteJson;
    }
}
?>