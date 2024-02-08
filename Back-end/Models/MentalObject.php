<?php
require_once 'ObservableObject.php';

class MentalObjectType{
    const Thought = "Thought";
    const FeelingTone = "Feeling Tone";
    const MentalState = "Mental State";
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