using Arm_mo.Models;
using backend.Models;
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
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Practiced Stages
            modelBuilder.Entity<PracticedStage>()
                .HasKey(ps => new { ps.SessionId, ps.StageId });

            modelBuilder.Entity<PracticedStage>()
                .HasOne(ps => ps.Session)
                .WithMany(s => s.PracticedStages)
                .HasForeignKey(ps => ps.SessionId);

            modelBuilder.Entity<PracticedStage>()
                .HasOne(ps => ps.Stage)
                .WithMany() // If you decide to add navigation back to Stage later
                .HasForeignKey(ps => ps.StageId)
                .OnDelete(DeleteBehavior.NoAction);

            // Newly Mastered Stages
            modelBuilder.Entity<NewlyMasteredStage>()
                .HasKey(nms => new { nms.SessionId, nms.StageId });

            modelBuilder.Entity<NewlyMasteredStage>()
                .HasOne(nms => nms.Session)
                .WithMany(s => s.NewlyMasterdStages)
                .HasForeignKey(nms => nms.SessionId);

            modelBuilder.Entity<NewlyMasteredStage>()
                .HasOne(nms => nms.Stage)
                .WithMany() // Similarly, if navigation is added back to Stage
                .HasForeignKey(nms => nms.StageId);

            modelBuilder.Entity<NewlyMasteredStage>()
                .HasOne(nms => nms.Stage) // Assuming a navigation property named Stage
                .WithMany() // Adjust based on your model
                .HasForeignKey(nms => nms.StageId)
                .OnDelete(DeleteBehavior.NoAction); // Prevent cascading delete
        }
        public DbSet<Meditator> Meditators { get; set; }
        public DbSet<ProfilePicture> ProfilePictures { get; set; }
        public DbSet<Stage> Stages { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<AhaMoment> AhaMoments { get; set; }
        public DbSet<ObservableObject> ObservableObjects { get; set; }
        public DbSet<Step> Steps { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<Goal> Goals { get; set; }
        public DbSet<UserUsage> UserUsage { get; set; }

    }
}
