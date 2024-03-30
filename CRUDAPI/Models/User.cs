using System.ComponentModel.DataAnnotations;
namespace CRUDAPI.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        public string UserName { get; set; }

        public string email { get; set; }

        public string senha { get; set; }

    }
}