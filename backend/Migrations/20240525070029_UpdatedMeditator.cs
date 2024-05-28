using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedMeditator : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MeditatorId",
                table: "PracticedStage",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Address",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MeditatorId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Address", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Address_Meditators_MeditatorId",
                        column: x => x.MeditatorId,
                        principalTable: "Meditators",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PracticedStage_MeditatorId",
                table: "PracticedStage",
                column: "MeditatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Address_MeditatorId",
                table: "Address",
                column: "MeditatorId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PracticedStage_Meditators_MeditatorId",
                table: "PracticedStage",
                column: "MeditatorId",
                principalTable: "Meditators",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PracticedStage_Meditators_MeditatorId",
                table: "PracticedStage");

            migrationBuilder.DropTable(
                name: "Address");

            migrationBuilder.DropIndex(
                name: "IX_PracticedStage_MeditatorId",
                table: "PracticedStage");

            migrationBuilder.DropColumn(
                name: "MeditatorId",
                table: "PracticedStage");
        }
    }
}
