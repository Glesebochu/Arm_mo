using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.DTOs.ObservableObject
{
    public class MeditationObjectDTO
    {
        public string Title { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;
        public ObservableObjectSubType SubType { get; set; }
    }
}