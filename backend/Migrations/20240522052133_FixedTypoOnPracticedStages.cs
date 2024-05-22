using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class FixedTypoOnPracticedStages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProfilePictures_Meditators_MeditatorID",
                table: "ProfilePictures");

            migrationBuilder.DropForeignKey(
                name: "FK_Sessions_Meditators_MeditatorID",
                table: "Sessions");

            migrationBuilder.DropForeignKey(
                name: "FK_UserUsage_Meditators_UserId",
                table: "UserUsage");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProfilePictures",
                table: "ProfilePictures");

            migrationBuilder.DropIndex(
                name: "IX_ProfilePictures_MeditatorID",
                table: "ProfilePictures");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Meditators",
                table: "Meditators");

            migrationBuilder.RenameColumn(
                name: "MeditatorID",
                table: "Sessions",
                newName: "MeditatorId");

            migrationBuilder.RenameIndex(
                name: "IX_Sessions_MeditatorID",
                table: "Sessions",
                newName: "IX_Sessions_MeditatorId");

            migrationBuilder.RenameColumn(
                name: "MeditatorID",
                table: "ProfilePictures",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "MeditatorID",
                table: "Meditators",
                newName: "profilePictureId");

            migrationBuilder.AlterColumn<int>(
                name: "ProfilePictureID",
                table: "ProfilePictures",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "ProfilePictures",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<int>(
                name: "profilePictureId",
                table: "Meditators",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Meditators",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProfilePictures",
                table: "ProfilePictures",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Meditators",
                table: "Meditators",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Meditators_profilePictureId",
                table: "Meditators",
                column: "profilePictureId");

            migrationBuilder.AddForeignKey(
                name: "FK_Meditators_ProfilePictures_profilePictureId",
                table: "Meditators",
                column: "profilePictureId",
                principalTable: "ProfilePictures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Sessions_Meditators_MeditatorId",
                table: "Sessions",
                column: "MeditatorId",
                principalTable: "Meditators",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserUsage_Meditators_UserId",
                table: "UserUsage",
                column: "UserId",
                principalTable: "Meditators",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meditators_ProfilePictures_profilePictureId",
                table: "Meditators");

            migrationBuilder.DropForeignKey(
                name: "FK_Sessions_Meditators_MeditatorId",
                table: "Sessions");

            migrationBuilder.DropForeignKey(
                name: "FK_UserUsage_Meditators_UserId",
                table: "UserUsage");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProfilePictures",
                table: "ProfilePictures");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Meditators",
                table: "Meditators");

            migrationBuilder.DropIndex(
                name: "IX_Meditators_profilePictureId",
                table: "Meditators");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Meditators");

            migrationBuilder.RenameColumn(
                name: "MeditatorId",
                table: "Sessions",
                newName: "MeditatorID");

            migrationBuilder.RenameIndex(
                name: "IX_Sessions_MeditatorId",
                table: "Sessions",
                newName: "IX_Sessions_MeditatorID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "ProfilePictures",
                newName: "MeditatorID");

            migrationBuilder.RenameColumn(
                name: "profilePictureId",
                table: "Meditators",
                newName: "MeditatorID");

            migrationBuilder.AlterColumn<int>(
                name: "ProfilePictureID",
                table: "ProfilePictures",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<int>(
                name: "MeditatorID",
                table: "ProfilePictures",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<int>(
                name: "MeditatorID",
                table: "Meditators",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProfilePictures",
                table: "ProfilePictures",
                column: "ProfilePictureID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Meditators",
                table: "Meditators",
                column: "MeditatorID");

            migrationBuilder.CreateIndex(
                name: "IX_ProfilePictures_MeditatorID",
                table: "ProfilePictures",
                column: "MeditatorID",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ProfilePictures_Meditators_MeditatorID",
                table: "ProfilePictures",
                column: "MeditatorID",
                principalTable: "Meditators",
                principalColumn: "MeditatorID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Sessions_Meditators_MeditatorID",
                table: "Sessions",
                column: "MeditatorID",
                principalTable: "Meditators",
                principalColumn: "MeditatorID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserUsage_Meditators_UserId",
                table: "UserUsage",
                column: "UserId",
                principalTable: "Meditators",
                principalColumn: "MeditatorID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
