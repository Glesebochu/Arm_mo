using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs.Hindrance
{
    public enum HindranceType
    {
        WorldlyDesire,
        Aversion,
        Lethargy_Laziness,
        Worry_Remorse,
        Doubt
    }
    public class HindranceDTO
    {

        public int Id { get; set; }
        public string Title { get; set; }
        public HindranceType Type { get; set; }
    }
}