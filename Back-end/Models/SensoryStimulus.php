<?php
require_once 'ObservableObject.php';

class SensoryStimulusType{
    const Visual = "Visual";
    const Auditory = "Auditory";
    const Olfactory = "Olfactory";
    const Kinesthetic = "Kinesthetic";
    const Taste = "Taste";
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