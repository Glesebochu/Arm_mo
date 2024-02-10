<?php
require_once 'ObservableObject.php';

class Activity{
    public $Activity_ID;
    public $Title;
    public $MeditationObject;

    public static function getActivity($identifier){
        // Connect to the database
        include_once(__DIR__ . '/../Connect.php');
        $con = new Connect;
        $db = $con->__getConnection();
        $db->query('USE Arm_mo_v2');

        /// Query the database based on the identifier
        $query = "SELECT * FROM Activity WHERE Activity_ID = '$identifier'";
        $result = $db->query($query);
        $row = $result->fetch_assoc();

        // Create a new object and assign values from the query result
        $activity = new Activity();
        $activity->Activity_ID = $row['Activity_ID'];
        $activity->Title = $row['Title'];
        $activity->MeditationObject = ObservableObject::getObservableObject($row['MeditationObject_ID']);

        return $activity;
    }

    public static function getJavaScriptActivity($identifier) {
        $activity = Activity::getActivity($identifier);
    
        // Convert the obser$activity object to a JSON string
        $activityJson = json_encode($activity);
    
        // Return the JavaScript code to create the JavaScript obser$activity object
        return $activityJson;
    }
}
?>