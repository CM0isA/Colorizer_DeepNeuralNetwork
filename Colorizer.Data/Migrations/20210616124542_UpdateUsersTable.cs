using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Colorizer.Data.Migrations
{
    public partial class UpdateUsersTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "InvitationStatus",
                table: "Users",
                newName: "AccountStatus");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("a9da6906-2870-41ab-92a2-0af5cffb6cf1"),
                column: "AccountStatus",
                value: "Confirmed");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AccountStatus",
                table: "Users",
                newName: "InvitationStatus");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("a9da6906-2870-41ab-92a2-0af5cffb6cf1"),
                column: "InvitationStatus",
                value: "Accepted");
        }
    }
}
