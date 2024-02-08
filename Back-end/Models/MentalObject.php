<?php
require_once 'ObservableObject.php';

enum MentalObjectType : string{
    case Thought = "Thought";
    case FeelingTone = "Feeling Tone";
    case MentalState = "Mental State";
}

class MentalObject extends ObservableObject{
    public $Discriminator = ObservableObjectType::MentalObject;
    public $MentalObject_Type;

    public static function getJavaScriptMentalObject($identifier) {
        return ObservableObject::getJavaScriptObservableObject($identifier);
    }
    public static function getJavaScriptMentalObjectArray($identifier){
        return ObservableObject::getJavaScriptObservableObjectArray($identifier, ObservableObjectType::MentalObject);
    }
}
?>