using System.ComponentModel.DataAnnotations.Schema;
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

        [NotMapped]
        public Stage? CurrentStage { get; set; }
        [NotMapped]
        public List<Stage>? PracticedStages { get; set; }

        public Address? Address { get; set; }
        public int AddressId { get; set; }
    }
}
