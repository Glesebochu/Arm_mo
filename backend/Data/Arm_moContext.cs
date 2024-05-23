using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class Arm_moContext : DbContext
    {
        public Arm_moContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {
            
        }

        public DbSet<Meditator> Meditators { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<Goal> Goals { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<ObservableObject> ObservableObjects { get; set; }
        public DbSet<Stage> Stages { get; set; }
    }
}