namespace Arm_mo.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public MentalObject MentalObject { get; set; }
        public Activity()
        {

        }
        public Activity(String title, MentalObject mentalObject) { 
            Title = title;
            MentalObject = mentalObject;
        }
        

    }
}
