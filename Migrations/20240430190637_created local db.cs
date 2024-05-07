using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Arm_mo.Migrations
{
    /// <inheritdoc />
    public partial class createdlocaldb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                        principalColumn: "MeditatorID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserUsage_UserId",
                table: "UserUsage",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserUsage");
        }
    }
}
