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
        public SensoryStimulusType SensoryStimulustype { get; set; }
        protected SensoryStimulus(String title, string description,
           string icon, IntensityType intensity) : base(title, description, icon, intensity)
        {

        }
        protected SensoryStimulus(SensoryStimulusType sensoryStimulusType,String title, string description, 
            string icon, IntensityType intensity):base(title, description, icon, intensity)
        {
            SensoryStimulustype = sensoryStimulusType;

        }
        

    }
}
