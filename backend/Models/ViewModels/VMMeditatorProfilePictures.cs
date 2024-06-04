namespace backend.Models.ViewModels
{
    public class VMMeditatorProfilePictures
    {
        public string Title = "Meditator Profile Pictures";
        public Meditator meditator { get; set; }
        public List<ProfilePicture> pictures { get; set; }
    }
}
