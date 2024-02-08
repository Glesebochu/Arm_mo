<?php
require_once 'ObservableObject.php';

enum SensoryStimulusType : string{
    case Visual = "Visual";
    case Auditory = "Auditory";
    case Olfactory = "Olfactory";
    case Kinesthetic = "Kinesthetic";
    case Taste = "Taste";
}

class SensoryStimulus extends ObservableObject{
    public $Discriminator = ObservableObjectType::SensoryStimulus;
    public $SensoryStimulus_Type;

    public static function getJavaScriptSensoryStimulus($identifier) {
        return ObservableObject::getJavaScriptObservableObject($identifier);
    }
    public static function getJavaScriptSensoryStimulusArray($identifier){
        return ObservableObject::getJavaScriptObservableObjectArray($identifier, ObservableObjectType::SensoryStimulus);
    }
}
?>