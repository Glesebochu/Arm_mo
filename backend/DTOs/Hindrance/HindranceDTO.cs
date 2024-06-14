using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.DTOs.Hindrance
{
    public class HindranceDTO
    {

        public int Id { get; set; }
        public string Title { get; set; }
        public HindranceType Type { get; set; }
    }
}