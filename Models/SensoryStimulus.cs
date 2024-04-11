namespace Arm_mo.Models
{
    public class SensoryStimulus:ObservableObject
    {
        public enum SensoryStimulusType
        {
            Visual,
            Auditory,
            Olfactory,
            Kinesthetic,
            Taste
        }
        public SensoryStimulusType sensoryStimulustype { get; set; }
    }
}
