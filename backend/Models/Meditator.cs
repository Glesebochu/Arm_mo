using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Meditator
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = String.Empty;
        public string LastName { get; set; } = String.Empty;
        public string? Username { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;
        public string _password { get; set; } = String.Empty;
        public Stage CurrentStage { get; set; }
        public Address? Address { get; set; }
        public List<PracticedStage>? PracticedStages { get; set; }
        public String? ProfilePicture { get; set; } = String.Empty;

        public List<UserUsage>? UserUsages { get; set; }

        public Meditator() { }

        public Meditator(int Id, string firstName, string lastName, string username, string email, string password, Stage currentStage)
        {
            this.Id = Id;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Username = username;
            this.Email = email;
            this.Username = username;
            this._password = password;
            this.CurrentStage = currentStage;
        }

    }
}
