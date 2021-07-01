using Microsoft.EntityFrameworkCore.Migrations;

namespace Colorizer.Data.Migrations
{
    public partial class StatusCheck : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "status",
                table: "Reports",
                newName: "Status");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Reports",
                newName: "status");
        }
    }
}
