
using Microsoft.EntityFrameworkCore;
using Arm_mo.Models;

namespace Arm_mo.Repositories
{
    public class Arm_moRespository : IMeditatorRepository
    {
        public int Add(Meditator meditator)
        {
            var ctx = new Arm_moContext();
            ctx.Meditators.Add(meditator);
            return ctx.SaveChanges();
        }

        public int Delete(int meditatorId)
        {
            throw new NotImplementedException();
        }

        public List<Meditator> GetAllMeditators()
        {
            var ctx = new Arm_moContext();
            var meditators = ctx.Meditators.Include(pg => pg.profilePictures);
            return meditators.ToList();
        }

        public Meditator GetMeditatorById(int meditatorId)
        {
            var ctx = new Arm_moContext();
            Meditator? meditator = ctx.Meditators.Include(pg => pg.profilePictures).
                              Where(pr => pr.MeditatorId == meditatorId).FirstOrDefault();
            return meditator;
        }

        public int Update(Meditator meditator)
        {
            var ctx = new Arm_moContext();
            var pgs = ctx.Pictures.Where(pg => pg.MeditatorId == meditator.MeditatorId);
            if (pgs != null)
            {
                ctx.Pictures.RemoveRange(pgs);
            }
            ctx.Meditators.Update(meditator);
            int res = ctx.SaveChanges();
            return res;
        }
    }
}
