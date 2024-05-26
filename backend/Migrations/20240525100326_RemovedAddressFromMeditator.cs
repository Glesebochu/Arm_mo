using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class RemovedAddressFromMeditator : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Address_Meditators_MeditatorId",
                table: "Address");

            migrationBuilder.DropIndex(
                name: "IX_Address_MeditatorId",
                table: "Address");

            migrationBuilder.DropColumn(
                name: "MeditatorId",
                table: "Address");

            migrationBuilder.AddColumn<int>(
                name: "AddressId",
                table: "Meditators",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Meditators_AddressId",
                table: "Meditators",
                column: "AddressId");

            migrationBuilder.AddForeignKey(
                name: "FK_Meditators_Address_AddressId",
                table: "Meditators",
                column: "AddressId",
                principalTable: "Address",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meditators_Address_AddressId",
                table: "Meditators");

            migrationBuilder.DropIndex(
                name: "IX_Meditators_AddressId",
                table: "Meditators");

            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "Meditators");

            migrationBuilder.AddColumn<int>(
                name: "MeditatorId",
                table: "Address",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Address_MeditatorId",
                table: "Address",
                column: "MeditatorId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Address_Meditators_MeditatorId",
                table: "Address",
                column: "MeditatorId",
                principalTable: "Meditators",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
