using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddedPreparationPhase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Goals_Goals_ParentGoalId",
                table: "Goals");

            migrationBuilder.AddColumn<int>(
                name: "PreparationPhaseId",
                table: "Sessions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "PreparationPhase",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Duration = table.Column<TimeSpan>(type: "time", nullable: false),
                    ActivityId = table.Column<int>(type: "int", nullable: false),
                    MeditationObjectId = table.Column<int>(type: "int", nullable: false),
                    Motivation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GoalId = table.Column<int>(type: "int", nullable: false),
                    Expectation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Diligence = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Posture = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PreparationPhase", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PreparationPhase_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PreparationPhase_Goals_GoalId",
                        column: x => x.GoalId,
                        principalTable: "Goals",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PreparationPhase_ObservableObjects_MeditationObjectId",
                        column: x => x.MeditationObjectId,
                        principalTable: "ObservableObjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_PreparationPhaseId",
                table: "Sessions",
                column: "PreparationPhaseId");

            migrationBuilder.CreateIndex(
                name: "IX_Hindrance_PreparationPhaseId",
                table: "Hindrance",
                column: "PreparationPhaseId");

            migrationBuilder.CreateIndex(
                name: "IX_PreparationPhase_ActivityId",
                table: "PreparationPhase",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_PreparationPhase_GoalId",
                table: "PreparationPhase",
                column: "GoalId");

            migrationBuilder.CreateIndex(
                name: "IX_PreparationPhase_MeditationObjectId",
                table: "PreparationPhase",
                column: "MeditationObjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Goals_Goals_ParentGoalId",
                table: "Goals",
                column: "ParentGoalId",
                principalTable: "Goals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Sessions_PreparationPhase_PreparationPhaseId",
                table: "Sessions",
                column: "PreparationPhaseId",
                principalTable: "PreparationPhase",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Goals_Goals_ParentGoalId",
                table: "Goals");

            migrationBuilder.DropForeignKey(
                name: "FK_Sessions_PreparationPhase_PreparationPhaseId",
                table: "Sessions");

            migrationBuilder.DropTable(
                name: "Hindrance");

            migrationBuilder.DropTable(
                name: "PreparationPhase");

            migrationBuilder.DropIndex(
                name: "IX_Sessions_PreparationPhaseId",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "PreparationPhaseId",
                table: "Sessions");

            migrationBuilder.AddForeignKey(
                name: "FK_Goals_Goals_ParentGoalId",
                table: "Goals",
                column: "ParentGoalId",
                principalTable: "Goals",
                principalColumn: "Id");
        }
    }
}
