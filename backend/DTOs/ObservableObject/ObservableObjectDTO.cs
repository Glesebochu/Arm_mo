using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.DTOs.ObservableObject
{
    public class ObservableObjectDTO
    {
        public string Title { get; set; } = String.Empty;
        public IntensityType Intensity { get; set; }
        public ObservableObjectSubType SubType { get; set; }
    }
}