﻿namespace backend.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public string Title { get; set; } = String.Empty;
        public Activity()
        {

        }
        public Activity(String title)
        {
            Title = title;
        }


    }
}
