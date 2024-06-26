using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AfterCreateSessionWithNullablePracticedStage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Goals_Activities_ActivityId",
                table: "Goals");

            migrationBuilder.DropForeignKey(
                name: "FK_Goals_ObservableObjects_MeditationObjectId",
                table: "Goals");

            migrationBuilder.DropForeignKey(
                name: "FK_Hindrance_PreparationPhase_PreparationPhaseId",
                table: "Hindrance");

            migrationBuilder.DropForeignKey(
                name: "FK_NewlyMasteredStage_Sessions_SessionId",
                table: "NewlyMasteredStage");

            migrationBuilder.DropForeignKey(
                name: "FK_NewlyMasteredStage_Stages_StageId",
                table: "NewlyMasteredStage");

            migrationBuilder.DropForeignKey(
                name: "FK_PracticedStage_Meditators_MeditatorId",
                table: "PracticedStage");

            migrationBuilder.DropForeignKey(
                name: "FK_PracticedStage_Sessions_SessionId",
                table: "PracticedStage");

            migrationBuilder.DropForeignKey(
                name: "FK_PracticedStage_Stages_StageId",
                table: "PracticedStage");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PracticedStage",
                table: "PracticedStage");

            migrationBuilder.DropPrimaryKey(
                name: "PK_NewlyMasteredStage",
                table: "NewlyMasteredStage");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Hindrance",
                table: "Hindrance");

            migrationBuilder.RenameTable(
                name: "PracticedStage",
                newName: "PracticedStages");

            migrationBuilder.RenameTable(
                name: "NewlyMasteredStage",
                newName: "NewlyMasteredStages");

            migrationBuilder.RenameTable(
                name: "Hindrance",
                newName: "Hindrances");

            migrationBuilder.RenameIndex(
                name: "IX_PracticedStage_StageId",
                table: "PracticedStages",
                newName: "IX_PracticedStages_StageId");

            migrationBuilder.RenameIndex(
                name: "IX_PracticedStage_MeditatorId",
                table: "PracticedStages",
                newName: "IX_PracticedStages_MeditatorId");

            migrationBuilder.RenameIndex(
                name: "IX_NewlyMasteredStage_StageId",
                table: "NewlyMasteredStages",
                newName: "IX_NewlyMasteredStages_StageId");

            migrationBuilder.RenameIndex(
                name: "IX_Hindrance_PreparationPhaseId",
                table: "Hindrances",
                newName: "IX_Hindrances_PreparationPhaseId");

            migrationBuilder.AlterColumn<int>(
                name: "MeditationObjectId",
                table: "Goals",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ActivityId",
                table: "Goals",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_PracticedStages",
                table: "PracticedStages",
                columns: new[] { "SessionId", "StageId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_NewlyMasteredStages",
                table: "NewlyMasteredStages",
                columns: new[] { "SessionId", "StageId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Hindrances",
                table: "Hindrances",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Goals_Activities_ActivityId",
                table: "Goals",
                column: "ActivityId",
                principalTable: "Activities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Goals_ObservableObjects_MeditationObjectId",
                table: "Goals",
                column: "MeditationObjectId",
                principalTable: "ObservableObjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Hindrances_PreparationPhase_PreparationPhaseId",
                table: "Hindrances",
                column: "PreparationPhaseId",
                principalTable: "PreparationPhase",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_NewlyMasteredStages_Sessions_SessionId",
                table: "NewlyMasteredStages",
                column: "SessionId",
                principalTable: "Sessions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_NewlyMasteredStages_Stages_StageId",
                table: "NewlyMasteredStages",
                column: "StageId",
                principalTable: "Stages",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PracticedStages_Meditators_MeditatorId",
                table: "PracticedStages",
                column: "MeditatorId",
                principalTable: "Meditators",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PracticedStages_Sessions_SessionId",
                table: "PracticedStages",
                column: "SessionId",
                principalTable: "Sessions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PracticedStages_Stages_StageId",
                table: "PracticedStages",
                column: "StageId",
                principalTable: "Stages",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Goals_Activities_ActivityId",
                table: "Goals");

            migrationBuilder.DropForeignKey(
                name: "FK_Goals_ObservableObjects_MeditationObjectId",
                table: "Goals");

            migrationBuilder.DropForeignKey(
                name: "FK_Hindrances_PreparationPhase_PreparationPhaseId",
                table: "Hindrances");

            migrationBuilder.DropForeignKey(
                name: "FK_NewlyMasteredStages_Sessions_SessionId",
                table: "NewlyMasteredStages");

            migrationBuilder.DropForeignKey(
                name: "FK_NewlyMasteredStages_Stages_StageId",
                table: "NewlyMasteredStages");

            migrationBuilder.DropForeignKey(
                name: "FK_PracticedStages_Meditators_MeditatorId",
                table: "PracticedStages");

            migrationBuilder.DropForeignKey(
                name: "FK_PracticedStages_Sessions_SessionId",
                table: "PracticedStages");

            migrationBuilder.DropForeignKey(
                name: "FK_PracticedStages_Stages_StageId",
                table: "PracticedStages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PracticedStages",
                table: "PracticedStages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_NewlyMasteredStages",
                table: "NewlyMasteredStages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Hindrances",
                table: "Hindrances");

            migrationBuilder.RenameTable(
                name: "PracticedStages",
                newName: "PracticedStage");

            migrationBuilder.RenameTable(
                name: "NewlyMasteredStages",
                newName: "NewlyMasteredStage");

            migrationBuilder.RenameTable(
                name: "Hindrances",
                newName: "Hindrance");

            migrationBuilder.RenameIndex(
                name: "IX_PracticedStages_StageId",
                table: "PracticedStage",
                newName: "IX_PracticedStage_StageId");

            migrationBuilder.RenameIndex(
                name: "IX_PracticedStages_MeditatorId",
                table: "PracticedStage",
                newName: "IX_PracticedStage_MeditatorId");

            migrationBuilder.RenameIndex(
                name: "IX_NewlyMasteredStages_StageId",
                table: "NewlyMasteredStage",
                newName: "IX_NewlyMasteredStage_StageId");

            migrationBuilder.RenameIndex(
                name: "IX_Hindrances_PreparationPhaseId",
                table: "Hindrance",
                newName: "IX_Hindrance_PreparationPhaseId");

            migrationBuilder.AlterColumn<int>(
                name: "MeditationObjectId",
                table: "Goals",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ActivityId",
                table: "Goals",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PracticedStage",
                table: "PracticedStage",
                columns: new[] { "SessionId", "StageId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_NewlyMasteredStage",
                table: "NewlyMasteredStage",
                columns: new[] { "SessionId", "StageId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Hindrance",
                table: "Hindrance",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Goals_Activities_ActivityId",
                table: "Goals",
                column: "ActivityId",
                principalTable: "Activities",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Goals_ObservableObjects_MeditationObjectId",
                table: "Goals",
                column: "MeditationObjectId",
                principalTable: "ObservableObjects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Hindrance_PreparationPhase_PreparationPhaseId",
                table: "Hindrance",
                column: "PreparationPhaseId",
                principalTable: "PreparationPhase",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_NewlyMasteredStage_Sessions_SessionId",
                table: "NewlyMasteredStage",
                column: "SessionId",
                principalTable: "Sessions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_NewlyMasteredStage_Stages_StageId",
                table: "NewlyMasteredStage",
                column: "StageId",
                principalTable: "Stages",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PracticedStage_Meditators_MeditatorId",
                table: "PracticedStage",
                column: "MeditatorId",
                principalTable: "Meditators",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PracticedStage_Sessions_SessionId",
                table: "PracticedStage",
                column: "SessionId",
                principalTable: "Sessions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PracticedStage_Stages_StageId",
                table: "PracticedStage",
                column: "StageId",
                principalTable: "Stages",
                principalColumn: "Id");
        }
    }
}
