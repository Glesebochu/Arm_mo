using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddedHindranceAndGoal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_ObservableObjects_MentalObjectId",
                table: "Activities");

            migrationBuilder.DropIndex(
                name: "IX_Activities_MentalObjectId",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "MentalObjectId",
                table: "Activities");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Meditators",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Goals",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Status = table.Column<int>(type: "int", nullable: false),
                    ActivityId = table.Column<int>(type: "int", nullable: false),
                    MeditationObjectId = table.Column<int>(type: "int", nullable: true),
                    DueDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CompletedDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ParentGoalId = table.Column<int>(type: "int", nullable: true)
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
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Goals_ObservableObjects_MeditationObjectId",
                        column: x => x.MeditationObjectId,
                        principalTable: "ObservableObjects",
                        principalColumn: "Id");
                });

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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Goals");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Meditators");

            migrationBuilder.AddColumn<int>(
                name: "MentalObjectId",
                table: "Activities",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Activities_MentalObjectId",
                table: "Activities",
                column: "MentalObjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_ObservableObjects_MentalObjectId",
                table: "Activities",
                column: "MentalObjectId",
                principalTable: "ObservableObjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
