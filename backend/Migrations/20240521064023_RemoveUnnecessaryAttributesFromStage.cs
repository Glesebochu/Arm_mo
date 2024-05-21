using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class RemoveUnnecessaryAttributesFromStage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Intentions",
                table: "Stages");

            migrationBuilder.DropColumn(
                name: "IsMastered",
                table: "Stages");

            migrationBuilder.DropColumn(
                name: "MasteryRequirements",
                table: "Stages");

            migrationBuilder.DropColumn(
                name: "Obstacles",
                table: "Stages");

            migrationBuilder.DropColumn(
                name: "Skills",
                table: "Stages");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Intentions",
                table: "Stages",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsMastered",
                table: "Stages",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "MasteryRequirements",
                table: "Stages",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Obstacles",
                table: "Stages",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Skills",
                table: "Stages",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
