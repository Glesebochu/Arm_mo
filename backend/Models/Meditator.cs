using System.Net;

namespace backend.Models
{
    public class Meditator
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = String.Empty;
        public string LastName { get; set; } = String.Empty;
        public string Username { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;
        private string _password { get; set; } = String.Empty;
        public Stage? CurrentStage { get; set; }
        public List<Stage>? PracticedStages { get; set; }
        public Address? Address { get; set; }
    }
}
