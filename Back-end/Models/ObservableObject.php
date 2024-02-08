<?php

class ObservableObjectType{
    const SensoryStimulus = "SensoryStimulus";
    const MentalObject = "MentalObject";
}
class ObservableObjectIntensity{
    const Mild = "Mild";
    const Moderate = "Moderate";
    const Intense = "Intense";
}

class ObservableObject{
    public $ObservableObject_ID;
    public $Title;
    public $Discriminator;
    public $Description;
    public $Icon;
    public $Intensity;

    public static function getObservableObject($identifier){
        // Connect to the database
        include_once('../../Back-end/Connect.php');
        $con = new Connect;
        $db = $con->__getConnection();
        $db->query('USE Arm_mo_v2');

        /// Query the database based on the identifier
        $query = "SELECT * FROM ObservableObject WHERE ObservableObject_ID = '$identifier'";
        $result = $db->query($query);
        $row = $result->fetch_assoc();

        // Include necessary files
        require_once 'MentalObject.php';
        require_once 'SensoryStimulus.php';

        // Create a new object and assign values from the query result
        
        // Create different types depending on the discriminator.
        if ($row['Discriminator'] == ObservableObjectType::MentalObject) {
            $observableObject = new MentalObject();
            $observableObject->MentalObject_Type = $row['MentalObject_Type'];
        } else {
            $observableObject = new SensoryStimulus();
            $observableObject->SensoryStimulus_Type = $row['SensoryStimulus_Type'];
        }
        
        $observableObject->ObservableObject_ID = $row['ObservableObject_ID'];
        $observableObject->Title = $row['Title'];
        $observableObject->Discriminator = $row['Discriminator'];
        $observableObject->Description = $row['Description'];
        $observableObject->Icon = $row['Icon'];
        $observableObject->Intensity = $row['Intensity'];

        return $observableObject;
    }

    public static function getJavaScriptObservableObject($identifier) {
        $observableObject = ObservableObject::getObservableObject($identifier);
    
        // Convert the obser$observableObject object to a JSON string
        $observableObjectJson = json_encode($observableObject);
    
        // Return the JavaScript code to create the JavaScript obser$observableObject object
        return $observableObjectJson;
    }

    public static function getObservableObjectArray($Session_ID, $discriminator){
        include_once('../../Back-end/Connect.php');
        $con = new Connect;
        $db = $con->__getConnection();
        $db->query('USE Arm_mo_v2');

        // Query the database based on the Session ID
        $query = "SELECT * FROM ObservableObject
                  WHERE Session_ID = '$Session_ID' AND Discriminator = '$discriminator'";
        $result = $db->query($query);

        // Create an array to store the ObservableObjects
        $ObservableObjectArray = array();

        while ($row = $result->fetch_assoc()){
            // Add the observable object to the array
            $ObservableObjectArray[] = ObservableObject::getObservableObject($row['ObservableObject_ID']);
        }

        return $ObservableObjectArray;
    }

    public static function getJavaScriptObservableObjectArray($Session_ID , $discriminator){
        $ObservableObjectArray = ObservableObject::getObservableObjectArray($Session_ID, $discriminator);

        // Convert each Step object to a JSON string
        $ObservableObjectJsonArray = array();
        foreach ($ObservableObjectArray as $ObservableObject) {
            $ObservableObjectJson = json_encode($ObservableObject);
            $ObservableObjectJsonArray[] = $ObservableObjectJson;
        }

        // Return the JavaScript code to create the JavaScript ObservableObject array
        return json_encode($ObservableObjectJsonArray);
    }
}
?>