using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Arm_mo.Migrations
{
    /// <inheritdoc />
    public partial class IntitialArm_moMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Meditators",
                columns: table => new
                {
                    MeditatorID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    _password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CurrentStage = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meditators", x => x.MeditatorID);
                });

            migrationBuilder.CreateTable(
                name: "Stages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Goal = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Intentions = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Obstacles = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Skills = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MasteryRequirements = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsMastered = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProfilePictures",
                columns: table => new
                {
                    ProfilePictureID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImgPath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MeditatorID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProfilePictures", x => x.ProfilePictureID);
                    table.ForeignKey(
                        name: "FK_ProfilePictures_Meditators_MeditatorID",
                        column: x => x.MeditatorID,
                        principalTable: "Meditators",
                        principalColumn: "MeditatorID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Sessions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MeditatorID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sessions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sessions_Meditators_MeditatorID",
                        column: x => x.MeditatorID,
                        principalTable: "Meditators",
                        principalColumn: "MeditatorID",
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
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ObservableObjects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Icon = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Intensity = table.Column<int>(type: "int", nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(21)", maxLength: 21, nullable: false),
                    SessionId = table.Column<int>(type: "int", nullable: true),
                    MentalObjectType = table.Column<int>(type: "int", nullable: true),
                    FeelingToneValue = table.Column<int>(type: "int", nullable: true),
                    MentalStateValue = table.Column<int>(type: "int", nullable: true),
                    SensoryStimulustype = table.Column<int>(type: "int", nullable: true)
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
                    StageId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PracticedStage", x => new { x.SessionId, x.StageId });
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
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Activities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MentalObjectId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Activities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Activities_ObservableObjects_MentalObjectId",
                        column: x => x.MentalObjectId,
                        principalTable: "ObservableObjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Steps",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Category = table.Column<int>(type: "int", nullable: false),
                    Duration = table.Column<double>(type: "float", nullable: false),
                    Response = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ActivityId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Steps", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Steps_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Activities_MentalObjectId",
                table: "Activities",
                column: "MentalObjectId");

            migrationBuilder.CreateIndex(
                name: "IX_AhaMoments_SessionId",
                table: "AhaMoments",
                column: "SessionId");

            migrationBuilder.CreateIndex(
                name: "IX_NewlyMasteredStage_StageId",
                table: "NewlyMasteredStage",
                column: "StageId");

            migrationBuilder.CreateIndex(
                name: "IX_ObservableObjects_SessionId",
                table: "ObservableObjects",
                column: "SessionId");

            migrationBuilder.CreateIndex(
                name: "IX_PracticedStage_StageId",
                table: "PracticedStage",
                column: "StageId");

            migrationBuilder.CreateIndex(
                name: "IX_ProfilePictures_MeditatorID",
                table: "ProfilePictures",
                column: "MeditatorID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_MeditatorID",
                table: "Sessions",
                column: "MeditatorID");

            migrationBuilder.CreateIndex(
                name: "IX_Steps_ActivityId",
                table: "Steps",
                column: "ActivityId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AhaMoments");

            migrationBuilder.DropTable(
                name: "NewlyMasteredStage");

            migrationBuilder.DropTable(
                name: "PracticedStage");

            migrationBuilder.DropTable(
                name: "ProfilePictures");

            migrationBuilder.DropTable(
                name: "Steps");

            migrationBuilder.DropTable(
                name: "Stages");

            migrationBuilder.DropTable(
                name: "Activities");

            migrationBuilder.DropTable(
                name: "ObservableObjects");

            migrationBuilder.DropTable(
                name: "Sessions");

            migrationBuilder.DropTable(
                name: "Meditators");
        }
    }
}
