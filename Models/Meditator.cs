using System.ComponentModel.DataAnnotations.Schema;

namespace Arm_mo.Models
{
    public class Meditator
    {
        public int MeditatorId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        private string _password { get; set; }
        public string CurrentStage { get; set; }
        public string[] PracticedStages { get; set; }
        public Address Address { get; set; }

        // Main profile picture
        //[NotMapped]
        //public IFormFile profilePictureFormFile { get; set; }
        //public ProfilePicture profilePicture { get; set; }

        // Old Profile Pictures
        [NotMapped]
        public List<IFormFile> profilePicturesFormFile { get; set; }
        [NotMapped]
        public List<ProfilePicture> profilePictures { get; set; }

        public List<UserUsage> UserUsages { get; set; }

        public Meditator() { }

        public Meditator(int meditatorID, string firstName, string lastName, string username, string password, Stage currentStage)
        {
            this.MeditatorID = meditatorID;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Username = username;
            this._password = password;
            this.CurrentStage = currentStage;
        }

    }
}
