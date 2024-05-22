using System.Net;

namespace backend.Models
{
    public class Meditator
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        private string _password { get; set; }
        public Stage CurrentStage { get; set; }
        public List<Stage> PracticedStages { get; set; }
        public Address? Address { get; set; }
    }
}
