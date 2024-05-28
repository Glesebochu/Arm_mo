namespace backend.Models{
    public enum HindranceType
    {
        WorldlyDesire,
        Aversion,
        Lethargy_Laziness,
        Worry_Remorse,
        Doubt
    }

    public class Hindrance
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public HindranceType Type { get; set; }
    }
}