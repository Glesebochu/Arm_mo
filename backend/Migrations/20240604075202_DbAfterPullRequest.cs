using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class DbAfterPullRequest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Activities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Activities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Address",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Address", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PreparationPhase",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Duration = table.Column<TimeSpan>(type: "time", nullable: false),
                    Motivation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Expectation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDateTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PreparationPhase", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProfilePictures",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProfilePictureID = table.Column<int>(type: "int", nullable: false),
                    ImgPath = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProfilePictures", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Stages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Goal = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Hindrance",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    PreparationPhaseId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hindrance", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Hindrance_PreparationPhase_PreparationPhaseId",
                        column: x => x.PreparationPhaseId,
                        principalTable: "PreparationPhase",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Meditators",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    _password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CurrentStageId = table.Column<int>(type: "int", nullable: false),
                    AddressId = table.Column<int>(type: "int", nullable: true),
                    ProfilePicture = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meditators", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Meditators_Address_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Address",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Meditators_Stages_CurrentStageId",
                        column: x => x.CurrentStageId,
                        principalTable: "Stages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Sessions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StartDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MeditatorId = table.Column<int>(type: "int", nullable: false),
                    PreparationPhaseId = table.Column<int>(type: "int", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sessions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sessions_Meditators_MeditatorId",
                        column: x => x.MeditatorId,
                        principalTable: "Meditators",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Sessions_PreparationPhase_PreparationPhaseId",
                        column: x => x.PreparationPhaseId,
                        principalTable: "PreparationPhase",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserUsage",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UsageTime = table.Column<TimeSpan>(type: "time", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserUsage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserUsage_Meditators_UserId",
                        column: x => x.UserId,
                        principalTable: "Meditators",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AhaMoments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Label = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SessionId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AhaMoments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AhaMoments_Sessions_SessionId",
                        column: x => x.SessionId,
                        principalTable: "Sessions",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "NewlyMasteredStage",
                columns: table => new
                {
                    SessionId = table.Column<int>(type: "int", nullable: false),
                    StageId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NewlyMasteredStage", x => new { x.SessionId, x.StageId });
                    table.ForeignKey(
                        name: "FK_NewlyMasteredStage_Sessions_SessionId",
                        column: x => x.SessionId,
                        principalTable: "Sessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NewlyMasteredStage_Stages_StageId",
                        column: x => x.StageId,
                        principalTable: "Stages",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ObservableObjects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Intensity = table.Column<int>(type: "int", nullable: true),
                    SubType = table.Column<int>(type: "int", nullable: false),
                    ProximityToMO = table.Column<int>(type: "int", nullable: false),
                    SessionId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ObservableObjects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ObservableObjects_Sessions_SessionId",
                        column: x => x.SessionId,
                        principalTable: "Sessions",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PracticedStage",
                columns: table => new
                {
                    SessionId = table.Column<int>(type: "int", nullable: false),
                    StageId = table.Column<int>(type: "int", nullable: false),
                    MeditatorId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PracticedStage", x => new { x.SessionId, x.StageId });
                    table.ForeignKey(
                        name: "FK_PracticedStage_Meditators_MeditatorId",
                        column: x => x.MeditatorId,
                        principalTable: "Meditators",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PracticedStage_Sessions_SessionId",
                        column: x => x.SessionId,
                        principalTable: "Sessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PracticedStage_Stages_StageId",
                        column: x => x.StageId,
                        principalTable: "Stages",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Goals",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Status = table.Column<int>(type: "int", nullable: false),
                    ParentGoalId = table.Column<int>(type: "int", nullable: true),
                    DueDate = table.Column<DateOnly>(type: "date", nullable: false),
                    CompletedDate = table.Column<DateOnly>(type: "date", nullable: false),
                    ActivityId = table.Column<int>(type: "int", nullable: false),
                    MeditationObjectId = table.Column<int>(type: "int", nullable: true),
                    PreparationPhaseId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Goals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Goals_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Goals_Goals_ParentGoalId",
                        column: x => x.ParentGoalId,
                        principalTable: "Goals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Goals_ObservableObjects_MeditationObjectId",
                        column: x => x.MeditationObjectId,
                        principalTable: "ObservableObjects",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Goals_PreparationPhase_PreparationPhaseId",
                        column: x => x.PreparationPhaseId,
                        principalTable: "PreparationPhase",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AhaMoments_SessionId",
                table: "AhaMoments",
                column: "SessionId");

            migrationBuilder.CreateIndex(
                name: "IX_Goals_ActivityId",
                table: "Goals",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_Goals_MeditationObjectId",
                table: "Goals",
                column: "MeditationObjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Goals_ParentGoalId",
                table: "Goals",
                column: "ParentGoalId");

            migrationBuilder.CreateIndex(
                name: "IX_Goals_PreparationPhaseId",
                table: "Goals",
                column: "PreparationPhaseId");

            migrationBuilder.CreateIndex(
                name: "IX_Hindrance_PreparationPhaseId",
                table: "Hindrance",
                column: "PreparationPhaseId");

            migrationBuilder.CreateIndex(
                name: "IX_Meditators_AddressId",
                table: "Meditators",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Meditators_CurrentStageId",
                table: "Meditators",
                column: "CurrentStageId");

            migrationBuilder.CreateIndex(
                name: "IX_NewlyMasteredStage_StageId",
                table: "NewlyMasteredStage",
                column: "StageId");

            migrationBuilder.CreateIndex(
                name: "IX_ObservableObjects_SessionId",
                table: "ObservableObjects",
                column: "SessionId");

            migrationBuilder.CreateIndex(
                name: "IX_PracticedStage_MeditatorId",
                table: "PracticedStage",
                column: "MeditatorId");

            migrationBuilder.CreateIndex(
                name: "IX_PracticedStage_StageId",
                table: "PracticedStage",
                column: "StageId");

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_MeditatorId",
                table: "Sessions",
                column: "MeditatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_PreparationPhaseId",
                table: "Sessions",
                column: "PreparationPhaseId");

            migrationBuilder.CreateIndex(
                name: "IX_UserUsage_UserId",
                table: "UserUsage",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AhaMoments");

            migrationBuilder.DropTable(
                name: "Goals");

            migrationBuilder.DropTable(
                name: "Hindrance");

            migrationBuilder.DropTable(
                name: "NewlyMasteredStage");

            migrationBuilder.DropTable(
                name: "PracticedStage");

            migrationBuilder.DropTable(
                name: "ProfilePictures");

            migrationBuilder.DropTable(
                name: "UserUsage");

            migrationBuilder.DropTable(
                name: "Activities");

            migrationBuilder.DropTable(
                name: "ObservableObjects");

            migrationBuilder.DropTable(
                name: "Sessions");

            migrationBuilder.DropTable(
                name: "Meditators");

            migrationBuilder.DropTable(
                name: "PreparationPhase");

            migrationBuilder.DropTable(
                name: "Address");

            migrationBuilder.DropTable(
                name: "Stages");
        }
    }
}
