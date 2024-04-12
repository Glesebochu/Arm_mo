using Arm_mo.Models;

namespace Arm_mo.Repositories
{
    public interface IStageRepository
    {
        public int Add(Stage stage);
        public int Update(Stage stage);
        public int Delete(int stageId);
        public Stage GetStageById(int stageId);
        public List<Stage> GetAllStages();
    }
}
