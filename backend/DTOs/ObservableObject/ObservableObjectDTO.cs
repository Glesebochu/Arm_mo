using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.DTOs.ObservableObject
{
    public class ObservableObjectDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;
        public IntensityType Intensity { get; set; }
        public ObservableObjectSubType SubType { get; set; }
        public Proximity ProximityToMO { get; set; }
    }
}