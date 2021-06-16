﻿using Colorizer.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;

namespace Colorizer.Data
{
    public class ColorizerContext : DbContext
    {
        public ColorizerContext(DbContextOptions<ColorizerContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Reports> Reports { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(e =>
            {
                e.Property(e => e.Role)
                    .HasColumnType("varchar(255)")
                    .HasConversion(new EnumToStringConverter<UserRole>());

                e.Property(e => e.InvitationStatus)
                    .HasColumnType("varchar(255)")
                    .HasConversion(new EnumToStringConverter<UserInvitationStatus>());

                e.Property(e => e.InvitationCode)
                   .HasColumnType("varchar(255)");

                e.HasData(
                    new User
                    {
                        Id = new Guid("a9da6906-2870-41ab-92a2-0af5cffb6cf1"),
                        Email = "admin@admin.com",
                        HashedPassword = "$2a$11$iQCxKDW4VvAP.1yu5iGe5O6WTjalhd3Ksjvt1NJ2N.8ArSm5HnVOG", // password is admin
                        Role = UserRole.Administrator,
                        FirstName = "admin",
                        LastName = "admin",
                        InvitationStatus = UserInvitationStatus.Accepted,
                        InvitationCode = ""
                    });
            });
        }
    }
}