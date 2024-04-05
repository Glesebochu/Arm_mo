using Microsoft.EntityFrameworkCore;
using Arm_mo.Models;

namespace Arm_mo.Data
{
    public class Arm_moContext : DbContext
    {
        public DbSet<Meditator> Meditators { get; set; }
        public DbSet<Stage> Stages { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=.;Database=Arm_moDB;  
                      Trusted_Connection=True; TrustServerCertificate=True");
        }
    }
}
