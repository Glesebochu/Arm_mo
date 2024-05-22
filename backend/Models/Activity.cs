namespace Arm_mo.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public ObservableObject MentalObject { get; set; }
        public Activity()
        {

        }
        public Activity(String title, ObservableObject mentalObject) { 
            Title = title;
            MentalObject = mentalObject;
        }
        

    }
}
