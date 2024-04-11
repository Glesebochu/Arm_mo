namespace Arm_mo.Models
{
    public class ObservableObject
    {
        public enum IntensityType
        {
            Mild,
            Moderate,
            Intense
        }
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Icon { get; set; }
        public IntensityType Intensity { get; set; }
    }
}
