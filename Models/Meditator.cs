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
        public Address Address { get; set; }

        // Main profile picture
        [NotMapped]
        public IFormFile profilePictureFormFile { get; set; }
        public ProfilePicture profilePicture { get; set; }

        // Old Profile Pictures
        [NotMapped]
        public List<IFormFile> profilePicturesFormFile { get; set; }
        public List<ProfilePicture> profilePictures { get; set; }

    }
}
