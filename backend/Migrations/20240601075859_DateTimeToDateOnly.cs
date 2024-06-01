using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class DateTimeToDateOnly : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "CompletedDateTime",
                table: "Goals");

            migrationBuilder.DropColumn(
                name: "DueDateTime",
                table: "Goals");

            migrationBuilder.AddColumn<DateOnly>(
                name: "CompletedDate",
                table: "Goals",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<DateOnly>(
                name: "DueDate",
                table: "Goals",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Addresses_Meditators_MeditatorId",
                table: "Addresses");

            migrationBuilder.DropIndex(
                name: "IX_Addresses_MeditatorId",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "CompletedDate",
                table: "Goals");

            migrationBuilder.DropColumn(
                name: "DueDate",
                table: "Goals");

            migrationBuilder.AddColumn<int>(
                name: "AddressId",
                table: "Meditators",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CompletedDateTime",
                table: "Goals",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DueDateTime",
                table: "Goals",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

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
    }
}
