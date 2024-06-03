using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class ModifiedModelsToTheNotionDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meditators_ProfilePictures_profilePictureId",
                table: "Meditators");

            migrationBuilder.DropForeignKey(
                name: "FK_PreparationPhase_Activities_ActivityId",
                table: "PreparationPhase");

            migrationBuilder.DropForeignKey(
                name: "FK_PreparationPhase_Goals_GoalId",
                table: "PreparationPhase");

            migrationBuilder.DropForeignKey(
                name: "FK_PreparationPhase_ObservableObjects_MeditationObjectId",
                table: "PreparationPhase");

            migrationBuilder.DropIndex(
                name: "IX_PreparationPhase_ActivityId",
                table: "PreparationPhase");

            migrationBuilder.DropIndex(
                name: "IX_PreparationPhase_GoalId",
                table: "PreparationPhase");

            migrationBuilder.DropIndex(
                name: "IX_PreparationPhase_MeditationObjectId",
                table: "PreparationPhase");

            migrationBuilder.DropIndex(
                name: "IX_Meditators_profilePictureId",
                table: "Meditators");

            migrationBuilder.DropColumn(
                name: "ActivityId",
                table: "PreparationPhase");

            migrationBuilder.DropColumn(
                name: "Diligence",
                table: "PreparationPhase");

            migrationBuilder.DropColumn(
                name: "GoalId",
                table: "PreparationPhase");

            migrationBuilder.DropColumn(
                name: "MeditationObjectId",
                table: "PreparationPhase");

            migrationBuilder.DropColumn(
                name: "Posture",
                table: "PreparationPhase");

            migrationBuilder.DropColumn(
                name: "Icon",
                table: "ObservableObjects");

            migrationBuilder.DropColumn(
                name: "feelingTone",
                table: "ObservableObjects");

            migrationBuilder.DropColumn(
                name: "profilePictureId",
                table: "Meditators");

            migrationBuilder.DropColumn(
                name: "CompletedDateTime",
                table: "Goals");

            migrationBuilder.DropColumn(
                name: "DueDateTime",
                table: "Goals");

            migrationBuilder.RenameColumn(
                name: "StartTime",
                table: "Sessions",
                newName: "StartDateTime");

            migrationBuilder.RenameColumn(
                name: "EndTime",
                table: "Sessions",
                newName: "EndDateTime");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDateTime",
                table: "PreparationPhase",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDateTime",
                table: "PreparationPhase",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "ProximityToMO",
                table: "ObservableObjects",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Username",
                table: "Meditators",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "ProfilePicture",
                table: "Meditators",
                type: "nvarchar(max)",
                nullable: true);

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

            migrationBuilder.AddColumn<int>(
                name: "PreparationPhaseId",
                table: "Goals",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Goals_PreparationPhaseId",
                table: "Goals",
                column: "PreparationPhaseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Goals_PreparationPhase_PreparationPhaseId",
                table: "Goals",
                column: "PreparationPhaseId",
                principalTable: "PreparationPhase",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Goals_PreparationPhase_PreparationPhaseId",
                table: "Goals");

            migrationBuilder.DropIndex(
                name: "IX_Goals_PreparationPhaseId",
                table: "Goals");

            migrationBuilder.DropColumn(
                name: "EndDateTime",
                table: "PreparationPhase");

            migrationBuilder.DropColumn(
                name: "StartDateTime",
                table: "PreparationPhase");

            migrationBuilder.DropColumn(
                name: "ProximityToMO",
                table: "ObservableObjects");

            migrationBuilder.DropColumn(
                name: "ProfilePicture",
                table: "Meditators");

            migrationBuilder.DropColumn(
                name: "CompletedDate",
                table: "Goals");

            migrationBuilder.DropColumn(
                name: "DueDate",
                table: "Goals");

            migrationBuilder.DropColumn(
                name: "PreparationPhaseId",
                table: "Goals");

            migrationBuilder.RenameColumn(
                name: "StartDateTime",
                table: "Sessions",
                newName: "StartTime");

            migrationBuilder.RenameColumn(
                name: "EndDateTime",
                table: "Sessions",
                newName: "EndTime");

            migrationBuilder.AddColumn<int>(
                name: "ActivityId",
                table: "PreparationPhase",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Diligence",
                table: "PreparationPhase",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "GoalId",
                table: "PreparationPhase",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MeditationObjectId",
                table: "PreparationPhase",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Posture",
                table: "PreparationPhase",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Icon",
                table: "ObservableObjects",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "feelingTone",
                table: "ObservableObjects",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Username",
                table: "Meditators",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "profilePictureId",
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

            migrationBuilder.CreateIndex(
                name: "IX_Meditators_profilePictureId",
                table: "Meditators",
                column: "profilePictureId");

            migrationBuilder.AddForeignKey(
                name: "FK_Meditators_ProfilePictures_profilePictureId",
                table: "Meditators",
                column: "profilePictureId",
                principalTable: "ProfilePictures",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PreparationPhase_Activities_ActivityId",
                table: "PreparationPhase",
                column: "ActivityId",
                principalTable: "Activities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PreparationPhase_Goals_GoalId",
                table: "PreparationPhase",
                column: "GoalId",
                principalTable: "Goals",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PreparationPhase_ObservableObjects_MeditationObjectId",
                table: "PreparationPhase",
                column: "MeditationObjectId",
                principalTable: "ObservableObjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
