using Arm_mo_2.Models;

namespace Arm_mo_2.Context
{
    public class Arm_moContext : DbContext
    {
        public DbSet<Meditator> Meditators { get; set; }
        public DbSet<Stage> Stages { get; set; }
    }
}
