using System.ComponentModel.DataAnnotations.Schema;
namespace Arm_mo.Models
{
    public class Stage
    {
        public int Id { get; set; }
        public string Goal { get; set; }

        [NotMapped]       
        public List<string> Intentions { get; set; }

        [NotMapped]
        public List<string> Obstacles { get; set; }

        [NotMapped]
        public List<string> Skills { get; set; }
        
        [NotMapped]
        public List<string> MasteryRequirements { get; set; }
        public Stage()
        {

        }
    }
}
