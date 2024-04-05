using Arm_mo.Models;

namespace Arm_mo.Data
{
    public interface IMeditatorRepository
    {
        public int Add(Meditator meditator);
        public int Update(Meditator meditator);
        public int Delete(int meditatorId);
        public Meditator GetMeditatorById(int meditatorId);
        public List<Meditator> GetAllMeditators();
    }
}
