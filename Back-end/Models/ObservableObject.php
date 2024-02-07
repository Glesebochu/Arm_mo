<?php

enum ObservableObjectType: string{
    case SensoryStimulus = "Sensory Stimulus";
    case MentalObject = "Mental Object";
}
enum ObservableObjectIntensity : string{
    case Mild = "Mild";
    case Moderate = "Moderate";
    case Intense = "Intense";
}

class ObservableObject{
    public $Id;
    public $Title;
    public $Type;
    public $Description;
    public $Icon;
    public $Intensity;

    public static function getObservableObject($identifier){
        // Connect to the database
        include_once('../../Back-end/Connect.php');
        $con = new Connect;
        $db = $con->__getConnection();
        $db->query('USE Arm_mo');

        /// Query the database based on the identifier
        $query = "SELECT * FROM ObservableObject WHERE Id = '$identifier'";
        $result = $db->query($query);
        $row = $result->fetch_assoc();

        // Create a new object and assign values from the query result
        
        // Create different types depending on the discriminator.
        if ($row['Discriminator'] == "MentalObject" || $row['Type'] == ObservableObjectType::MentalObject) {
            $observableObject = new MentalObject();
            $observableObject->Mental_Object_Type = $row['Mental_Object_Type'];
        } else {
            $observableObject = new SensoryStimulus();
            $observableObject->Sensory_Stimulus_Type = $row['Sensory_Stimulus_Type'];
        }
        
        $observableObject->Id = $row['Id'];
        $observableObject->Title = $row['Title'];
        $observableObject->Type = $row['Type'];
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
}
?>