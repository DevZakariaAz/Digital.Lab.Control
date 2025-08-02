using DigitalLabControlAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace DigitalLabControlAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Document> Documents { get; set; }
        public DbSet<Fonctionnaire> Fonctionnaires { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Document>()
                .HasMany(d => d.Fonctionnaires)
                .WithOne(f => f.Document)
                .HasForeignKey(f => f.DocumentId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
