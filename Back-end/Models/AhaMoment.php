<?php

class AhaMoment{
    public $AhaMoment_ID;
    public $Label;

    public static function getAhaMoment($identifier){
        // Connect to the database
        include_once('../../Back-end/Connect.php');
        $con = new Connect;
        $db = $con->__getConnection();
        $db->query('USE Arm_mo_v2');

        /// Query the database based on the identifier
        $query = "SELECT * FROM AhaMoment WHERE AhaMoment_ID = '$identifier'";
        $result = $db->query($query);
        $row = $result->fetch_assoc();

        // Create a new object and assign values from the query result
        $ahaMoment = new AhaMoment();
        $ahaMoment->AhaMoment_ID = $row['AhaMoment_ID'];
        $ahaMoment->Label = $row['Label'];

        return $ahaMoment;
    }

    public static function getJavaScriptAhaMoment($identifier) {
        $ahaMoment = AhaMoment::getAhaMoment($identifier);
    
        // Convert the obser$ahaMoment object to a JSON string
        $ahaMomentJson = json_encode($ahaMoment);
    
        // Return the JavaScript code to create the JavaScript obser$ahaMoment object
        return $ahaMomentJson;
    }
}
?>