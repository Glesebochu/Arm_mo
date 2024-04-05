using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Arm_mo.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Meditators",
                columns: table => new
                {
                    MeditatorId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CurrentStage = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meditators", x => x.MeditatorId);
                });

            migrationBuilder.CreateTable(
                name: "Stages",
                columns: table => new
                {
                    StageId = table.Column<int>(type: "int", nullable: false)
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
                    table.PrimaryKey("PK_Stages", x => x.StageId);
                });

            migrationBuilder.CreateTable(
                name: "Address",
                columns: table => new
                {
                    AddressId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MeditatorId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Address", x => x.AddressId);
                    table.ForeignKey(
                        name: "FK_Address_Meditators_MeditatorId",
                        column: x => x.MeditatorId,
                        principalTable: "Meditators",
                        principalColumn: "MeditatorId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProfilePicture",
                columns: table => new
                {
                    ProfilePictureId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImgPath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MeditatorId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProfilePicture", x => x.ProfilePictureId);
                    table.ForeignKey(
                        name: "FK_ProfilePicture_Meditators_MeditatorId",
                        column: x => x.MeditatorId,
                        principalTable: "Meditators",
                        principalColumn: "MeditatorId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StagePicture",
                columns: table => new
                {
                    StagePictureId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImgPath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StageId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StagePicture", x => x.StagePictureId);
                    table.ForeignKey(
                        name: "FK_StagePicture_Stages_StageId",
                        column: x => x.StageId,
                        principalTable: "Stages",
                        principalColumn: "StageId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Address_MeditatorId",
                table: "Address",
                column: "MeditatorId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProfilePicture_MeditatorId",
                table: "ProfilePicture",
                column: "MeditatorId");

            migrationBuilder.CreateIndex(
                name: "IX_StagePicture_StageId",
                table: "StagePicture",
                column: "StageId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Address");

            migrationBuilder.DropTable(
                name: "ProfilePicture");

            migrationBuilder.DropTable(
                name: "StagePicture");

            migrationBuilder.DropTable(
                name: "Meditators");

            migrationBuilder.DropTable(
                name: "Stages");
        }
    }
}
