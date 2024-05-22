using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Stage
    {
        public int Id { get; set; }
        public string Goal { get; set; }


        [NotMapped]
        public string[] Intentions { get; set; }
        [NotMapped]
        public string[] Obstacles { get; set; }
        [NotMapped]
        public string[] Skills { get; set; }
        [NotMapped]
        public string[] MasteryRequirements { get; set; }
    }
}
