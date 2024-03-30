using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace CRUDAPI.Models
{
    public class Task
    {
        [Key]
        public int TaskId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public bool IsComplete { get; set; }

        // ForeignKey for User
        [ForeignKey("UserId")]
        public int UserId { get; set; }
        
    }
}
