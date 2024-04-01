namespace Arm_mo_2.Models.Templates
{
    public class DataSource
    {
        public static List<Meditator> GetAllMeditators()
        {
            return new List<Meditator>()
            {
                new Meditator()
                {
                    MeditatorID = 1,
                    FirstName = "Zelalem",
                    LastName = "Amare",
                    Username = "Fellasfaw",
                    _password = "test",
                    CurrentStage = "3"
                },
                new Meditator()
                {
                    MeditatorID = 2,
                    FirstName = "Yanet",
                    LastName = "Abhram",
                    Username = "Yan8i",
                    _password = "test",
                    CurrentStage = "3"
                },
                new Meditator()
                {
                    MeditatorID = 3,
                    FirstName = "Edomiyas",
                    LastName = "Wendwosen",
                    Username = "Yanetawi",
                    _password = "test",
                    CurrentStage = "3"
                },
                new Meditator()
                {
                    MeditatorID = 4,
                    FirstName = "Finhas",
                    LastName = "Yohannes",
                    Username = "Gustavo",
                    _password = "test",
                    CurrentStage = "3"
                }
        };
        }
    }
}
