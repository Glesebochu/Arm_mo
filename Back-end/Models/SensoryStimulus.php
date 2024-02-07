<?php

enum SensoryStimulusType : string{
    case Visual = "Visual";
    case Auditory = "Auditory";
    case Olfactory = "Olfactory";
    case Kinesthetic = "Kinesthetic";
    case Taste = "Taste";
}

class SensoryStimulus extends ObservableObject{
    public $Type = ObservableObjectType::SensoryStimulus;
    public $Sensory_Stimulus_Type;

}
?>