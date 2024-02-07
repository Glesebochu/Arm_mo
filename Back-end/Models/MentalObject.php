<?php

enum MentalObjectType : string{
    case Thought = "Thought";
    case FeelingTone = "Feeling Tone";
    case MentalState = "Mental State";
}

class MentalObject extends ObservableObject{
    public $Type = ObservableObjectType::MentalObject;
    public $Mental_Object_Type;
}
?>