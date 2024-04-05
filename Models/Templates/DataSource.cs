namespace Arm_mo.Models.Templates
{
    public class DataSource
    {
        public static List<Meditator> GetAllMeditators()
        {
            return new List<Meditator>()
            {
                new Meditator()
                {
                    MeditatorId = 1,
                    FirstName = "Zelalem",
                    LastName = "Amare",
                    Username = "Fellasfaw",
                    CurrentStage = "3"
                },
                new Meditator()
                {
                    MeditatorId = 2,
                    FirstName = "Yanet",
                    LastName = "Abhram",
                    Username = "Yan8i",
                    CurrentStage = "3"
                },
                new Meditator()
                {
                    MeditatorId = 3,
                    FirstName = "Edomiyas",
                    LastName = "Wendwosen",
                    Username = "Yanetawi",
                    CurrentStage = "3"
                },
                new Meditator()
                {
                    MeditatorId = 4,
                    FirstName = "Finhas",
                    LastName = "Yohannes",
                    Username = "Gustavo",
                    CurrentStage = "3"
                }
        };
        }
    }
}
