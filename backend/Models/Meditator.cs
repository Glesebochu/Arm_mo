using System.ComponentModel.DataAnnotations.Schema;

namespace Arm_mo.Models
{
    public class Meditator
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string _password { get; set; }
        public Stage CurrentStage { get; set; }

        // Main profile picture
        [NotMapped]
        public IFormFile profilePictureFormFile { get; set; }
        public ProfilePicture? profilePicture { get; set; }

        // Old Profile Pictures
        [NotMapped]
        public List<IFormFile> profilePicturesFormFile { get; set; }
        [NotMapped]
        public List<ProfilePicture> profilePictures { get; set; }

        public List<UserUsage>? UserUsages { get; set; }

        public Meditator() { }

        public Meditator(int Id, string firstName, string lastName, string username, string password, Stage currentStage)
        {
            this.Id = Id;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Username = username;
            this._password = password;
            this.CurrentStage = currentStage;
        }

    }
}
