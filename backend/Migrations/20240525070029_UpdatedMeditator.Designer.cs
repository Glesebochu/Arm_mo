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
    [Migration("20240525070029_UpdatedMeditator")]
    partial class UpdatedMeditator
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Address", b =>
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

                    b.Property<int>("MeditatorId")
                        .HasColumnType("int");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("MeditatorId")
                        .IsUnique();

                    b.ToTable("Address");
                });

            modelBuilder.Entity("backend.Models.Activity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("MentalObjectId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("MentalObjectId");

                    b.ToTable("Activities");
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

            modelBuilder.Entity("backend.Models.Meditator", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CurrentStageId")
                        .HasColumnType("int");

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

                    b.Property<DateTime>("StartTime")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("MeditatorId");

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

            modelBuilder.Entity("backend.Models.Step", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int?>("ActivityId")
                        .HasColumnType("int");

                    b.Property<int>("Category")
                        .HasColumnType("int");

                    b.Property<double>("Duration")
                        .HasColumnType("float");

                    b.Property<string>("Response")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("ActivityId");

                    b.ToTable("Steps");
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

            modelBuilder.Entity("ObservableObject", b =>
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

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.Property<int?>("feelingTone")
                        .HasColumnType("int");

                    b.Property<int?>("mentalState")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SessionId");

                    b.ToTable("ObservableObjects");
                });

            modelBuilder.Entity("Address", b =>
                {
                    b.HasOne("backend.Models.Meditator", null)
                        .WithOne("Address")
                        .HasForeignKey("Address", "MeditatorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("backend.Models.Activity", b =>
                {
                    b.HasOne("ObservableObject", "MentalObject")
                        .WithMany()
                        .HasForeignKey("MentalObjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("MentalObject");
                });

            modelBuilder.Entity("backend.Models.AhaMoment", b =>
                {
                    b.HasOne("backend.Models.Session", null)
                        .WithMany("AhaMoments")
                        .HasForeignKey("SessionId");
                });

            modelBuilder.Entity("backend.Models.Meditator", b =>
                {
                    b.HasOne("backend.Models.Stage", "CurrentStage")
                        .WithMany()
                        .HasForeignKey("CurrentStageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.ProfilePicture", "profilePicture")
                        .WithMany()
                        .HasForeignKey("profilePictureId");

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

            modelBuilder.Entity("backend.Models.Session", b =>
                {
                    b.HasOne("backend.Models.Meditator", "Meditator")
                        .WithMany()
                        .HasForeignKey("MeditatorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Meditator");
                });

            modelBuilder.Entity("backend.Models.Step", b =>
                {
                    b.HasOne("backend.Models.Activity", "Activity")
                        .WithMany()
                        .HasForeignKey("ActivityId");

                    b.Navigation("Activity");
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

            modelBuilder.Entity("ObservableObject", b =>
                {
                    b.HasOne("backend.Models.Session", null)
                        .WithMany("ObservableObjects")
                        .HasForeignKey("SessionId");
                });

            modelBuilder.Entity("backend.Models.Meditator", b =>
                {
                    b.Navigation("Address");

                    b.Navigation("PracticedStages");

                    b.Navigation("UserUsages");
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
