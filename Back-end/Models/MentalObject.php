<?php
require_once 'ObservableObject.php';

enum MentalObjectType : string{
    case Thought = "Thought";
    case FeelingTone = "Feeling Tone";
    case MentalState = "Mental State";
}

class MentalObject extends ObservableObject{
    public $Discriminator = ObservableObjectType::MentalObject;
    public $Mental_Object_Type;
}
?>