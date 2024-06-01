﻿// <auto-generated />
using System;
using Arm_mo.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(Arm_moContext))]
    [Migration("20240530075807_AddedPreparationPhase")]
    partial class AddedPreparationPhase
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("backend.Models.Activity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Activities");
                });

            modelBuilder.Entity("backend.Models.Address", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Address");
                });

            modelBuilder.Entity("backend.Models.AhaMoment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Label")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("SessionId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SessionId");

                    b.ToTable("AhaMoments");
                });

            modelBuilder.Entity("backend.Models.Goal", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ActivityId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CompletedDateTime")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DueDateTime")
                        .HasColumnType("datetime2");

                    b.Property<int?>("MeditationObjectId")
                        .HasColumnType("int");

                    b.Property<int?>("ParentGoalId")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ActivityId");

                    b.HasIndex("MeditationObjectId");

                    b.HasIndex("ParentGoalId");

                    b.ToTable("Goals");
                });

            modelBuilder.Entity("backend.Models.Hindrance", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("PreparationPhaseId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PreparationPhaseId");

                    b.ToTable("Hindrance");
                });

            modelBuilder.Entity("backend.Models.Meditator", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AddressId")
                        .HasColumnType("int");

                    b.Property<int>("CurrentStageId")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("_password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("profilePictureId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AddressId");

                    b.HasIndex("CurrentStageId");

                    b.HasIndex("profilePictureId");

                    b.ToTable("Meditators");
                });

            modelBuilder.Entity("backend.Models.NewlyMasteredStage", b =>
                {
                    b.Property<int>("SessionId")
                        .HasColumnType("int");

                    b.Property<int>("StageId")
                        .HasColumnType("int");

                    b.HasKey("SessionId", "StageId");

                    b.HasIndex("StageId");

                    b.ToTable("NewlyMasteredStage");
                });

            modelBuilder.Entity("backend.Models.ObservableObject", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Icon")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Intensity")
                        .HasColumnType("int");

                    b.Property<int?>("SessionId")
                        .HasColumnType("int");

                    b.Property<int>("SubType")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("feelingTone")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SessionId");

                    b.ToTable("ObservableObjects");
                });

            modelBuilder.Entity("backend.Models.PracticedStage", b =>
                {
                    b.Property<int>("SessionId")
                        .HasColumnType("int");

                    b.Property<int>("StageId")
                        .HasColumnType("int");

                    b.Property<int?>("MeditatorId")
                        .HasColumnType("int");

                    b.HasKey("SessionId", "StageId");

                    b.HasIndex("MeditatorId");

                    b.HasIndex("StageId");

                    b.ToTable("PracticedStage");
                });

            modelBuilder.Entity("backend.Models.PreparationPhase", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ActivityId")
                        .HasColumnType("int");

                    b.Property<string>("Diligence")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<TimeSpan>("Duration")
                        .HasColumnType("time");

                    b.Property<string>("Expectation")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("GoalId")
                        .HasColumnType("int");

                    b.Property<int>("MeditationObjectId")
                        .HasColumnType("int");

                    b.Property<string>("Motivation")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Posture")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ActivityId");

                    b.HasIndex("GoalId");

                    b.HasIndex("MeditationObjectId");

                    b.ToTable("PreparationPhase");
                });

            modelBuilder.Entity("backend.Models.ProfilePicture", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ImgPath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ProfilePictureID")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("ProfilePictures");
                });

            modelBuilder.Entity("backend.Models.Session", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("EndTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("MeditatorId")
                        .HasColumnType("int");

                    b.Property<int>("PreparationPhaseId")
                        .HasColumnType("int");

                    b.Property<DateTime>("StartTime")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("MeditatorId");

                    b.HasIndex("PreparationPhaseId");

                    b.ToTable("Sessions");
                });

            modelBuilder.Entity("backend.Models.Stage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Goal")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Stages");
                });

            modelBuilder.Entity("backend.Models.UserUsage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("StartTime")
                        .HasColumnType("datetime2");

                    b.Property<TimeSpan>("UsageTime")
                        .HasColumnType("time");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UserUsage");
                });

            modelBuilder.Entity("backend.Models.AhaMoment", b =>
                {
                    b.HasOne("backend.Models.Session", null)
                        .WithMany("AhaMoments")
                        .HasForeignKey("SessionId");
                });

            modelBuilder.Entity("backend.Models.Goal", b =>
                {
                    b.HasOne("backend.Models.Activity", "Activity")
                        .WithMany()
                        .HasForeignKey("ActivityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.ObservableObject", "MeditationObject")
                        .WithMany()
                        .HasForeignKey("MeditationObjectId");

                    b.HasOne("backend.Models.Goal", "ParentGoal")
                        .WithMany("ChildGoals")
                        .HasForeignKey("ParentGoalId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("Activity");

                    b.Navigation("MeditationObject");

                    b.Navigation("ParentGoal");
                });

            modelBuilder.Entity("backend.Models.Hindrance", b =>
                {
                    b.HasOne("backend.Models.PreparationPhase", null)
                        .WithMany("Distractions")
                        .HasForeignKey("PreparationPhaseId");
                });

            modelBuilder.Entity("backend.Models.Meditator", b =>
                {
                    b.HasOne("backend.Models.Address", "Address")
                        .WithMany()
                        .HasForeignKey("AddressId");

                    b.HasOne("backend.Models.Stage", "CurrentStage")
                        .WithMany()
                        .HasForeignKey("CurrentStageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.ProfilePicture", "profilePicture")
                        .WithMany()
                        .HasForeignKey("profilePictureId");

                    b.Navigation("Address");

                    b.Navigation("CurrentStage");

                    b.Navigation("profilePicture");
                });

            modelBuilder.Entity("backend.Models.NewlyMasteredStage", b =>
                {
                    b.HasOne("backend.Models.Session", "Session")
                        .WithMany("NewlyMasterdStages")
                        .HasForeignKey("SessionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.Stage", "Stage")
                        .WithMany()
                        .HasForeignKey("StageId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Session");

                    b.Navigation("Stage");
                });

            modelBuilder.Entity("backend.Models.ObservableObject", b =>
                {
                    b.HasOne("backend.Models.Session", null)
                        .WithMany("ObservableObjects")
                        .HasForeignKey("SessionId");
                });

            modelBuilder.Entity("backend.Models.PracticedStage", b =>
                {
                    b.HasOne("backend.Models.Meditator", null)
                        .WithMany("PracticedStages")
                        .HasForeignKey("MeditatorId");

                    b.HasOne("backend.Models.Session", "Session")
                        .WithMany("PracticedStages")
                        .HasForeignKey("SessionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.Stage", "Stage")
                        .WithMany()
                        .HasForeignKey("StageId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Session");

                    b.Navigation("Stage");
                });

            modelBuilder.Entity("backend.Models.PreparationPhase", b =>
                {
                    b.HasOne("backend.Models.Activity", "Activity")
                        .WithMany()
                        .HasForeignKey("ActivityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.Goal", "Goal")
                        .WithMany()
                        .HasForeignKey("GoalId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("backend.Models.ObservableObject", "MeditationObject")
                        .WithMany()
                        .HasForeignKey("MeditationObjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Activity");

                    b.Navigation("Goal");

                    b.Navigation("MeditationObject");
                });

            modelBuilder.Entity("backend.Models.Session", b =>
                {
                    b.HasOne("backend.Models.Meditator", "Meditator")
                        .WithMany()
                        .HasForeignKey("MeditatorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.PreparationPhase", "PreparationPhase")
                        .WithMany()
                        .HasForeignKey("PreparationPhaseId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Meditator");

                    b.Navigation("PreparationPhase");
                });

            modelBuilder.Entity("backend.Models.UserUsage", b =>
                {
                    b.HasOne("backend.Models.Meditator", "User")
                        .WithMany("UserUsages")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.Models.Goal", b =>
                {
                    b.Navigation("ChildGoals");
                });

            modelBuilder.Entity("backend.Models.Meditator", b =>
                {
                    b.Navigation("PracticedStages");

                    b.Navigation("UserUsages");
                });

            modelBuilder.Entity("backend.Models.PreparationPhase", b =>
                {
                    b.Navigation("Distractions");
                });

            modelBuilder.Entity("backend.Models.Session", b =>
                {
                    b.Navigation("AhaMoments");

                    b.Navigation("NewlyMasterdStages");

                    b.Navigation("ObservableObjects");

                    b.Navigation("PracticedStages");
                });
#pragma warning restore 612, 618
        }
    }
}
