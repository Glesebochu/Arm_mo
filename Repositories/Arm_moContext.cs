using Microsoft.EntityFrameworkCore;
using Arm_mo.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Arm_mo.Repositories
{
    public class Arm_moContext : IdentityDbContext
    {
        // Constructor that takes DbContextOptions and passes it to the base class
        public Arm_moContext(DbContextOptions<Arm_moContext> options) : base(options)
        {
        }
        public Arm_moContext() { }
        public DbSet<Meditator> Meditators { get; set; }
        public DbSet<Stage> Stages { get; set; }
        public DbSet<ProfilePicture> Pictures { get; set; }
        public DbSet<StagePicture> StagePictures {  get; set; }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer(@"Server=.;Database=Arm_moDB;  
        //              Trusted_Connection=True; TrustServerCertificate=True");
        //}
    }
}
