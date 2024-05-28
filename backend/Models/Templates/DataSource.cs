namespace backend.Models.Templates
{
    public class DataSource
    {
        public static List<Meditator> GetAllMeditators()
        {
            return new List<Meditator>()
            {
                new Meditator()
                {
                    Id = 1,
                    FirstName = "Zelalem",
                    LastName = "Amare",
                    Username = "Fellasfaw",
                    _password = "test",
                    // CurrentStage = "3"
                },
                new Meditator()
                {
                    Id = 2,
                    FirstName = "Yanet",
                    LastName = "Abhram",
                    Username = "Yan8i",
                    _password = "test",
                    // CurrentStage = "3"
                },
                new Meditator()
                {
                    Id = 3,
                    FirstName = "Edomiyas",
                    LastName = "Wendwosen",
                    Username = "Yanetawi",
                    _password = "test",
                    // CurrentStage = "3"
                },
                new Meditator()
                {
                    Id = 4,
                    FirstName = "Finhas",
                    LastName = "Yohannes",
                    Username = "Gustavo",
                    _password = "test",
                    // CurrentStage = "3"
                }
        };
        }
    }
}
