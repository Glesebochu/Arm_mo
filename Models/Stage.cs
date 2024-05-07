﻿using System.ComponentModel.DataAnnotations.Schema;

namespace Arm_mo.Models
{
    public class Stage
    {
        public int Id { get; set; }
        public string Goal { get; set; }
        public List<string> Intentions { get; set; }
        public List<string> Obstacles { get; set; }
        public List<string> Skills { get; set; }
        public List<string> MasteryRequirements { get; set; }
        public bool IsMastered { get; set; }

        // Main picture
        [NotMapped]
        public IFormFile pictureFormFile { get; set; }
        public StagePicture picture { get; set; }
    }
}
