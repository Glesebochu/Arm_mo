namespace backend.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public Activity()
        {

        }
        public Activity(String title)
        {
            Title = title;
        }


    }
}
