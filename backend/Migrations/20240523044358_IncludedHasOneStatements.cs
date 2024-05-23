using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class IncludedHasOneStatements : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Addresses_Meditators_MeditatorId",
                table: "Addresses");

            migrationBuilder.DropIndex(
                name: "IX_Addresses_MeditatorId",
                table: "Addresses");

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
                name: "FK_Meditators_Addresses_AddressId",
                table: "Meditators",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meditators_Addresses_AddressId",
                table: "Meditators");

            migrationBuilder.DropIndex(
                name: "IX_Meditators_AddressId",
                table: "Meditators");

            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "Meditators");

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_MeditatorId",
                table: "Addresses",
                column: "MeditatorId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Addresses_Meditators_MeditatorId",
                table: "Addresses",
                column: "MeditatorId",
                principalTable: "Meditators",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
