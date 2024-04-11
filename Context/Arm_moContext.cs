using Arm_mo.Models;
using Microsoft.EntityFrameworkCore;

namespace Arm_mo.Context
{
    public class Arm_moContext : DbContext
    {
        //This constructor is used for dependency injection 
        //Doing this allows configuration options to be passed from outside the class
        public Arm_moContext(DbContextOptions<Arm_moContext> options) : base(options)
        {
        }
        public DbSet<Meditator> Meditators { get; set; }
        public DbSet<Stage> Stages { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<AhaMoment> AhaMoments { get; set; }
        public DbSet<ObservableObject> ObservableObjects { get; set; }
        public DbSet<SensoryStimulus> SensoryStimuli { get; set;}
        public DbSet<MentalObject> MentalObjects { get; set;}
        public DbSet<Step> Steps { get; set; }
        public DbSet<Activity> Activities { get; set; }
      

    }
}
