using Microsoft.EntityFrameworkCore;

namespace CRUDAPI.Models
{
    public class Contexto : DbContext
    {
        
        public DbSet<User> Users { get; set; }
        public DbSet<Task> Tasks { get; set; }


        public Contexto(DbContextOptions<Contexto> opcoes) : base(opcoes)
        {
            

        }
    }
}