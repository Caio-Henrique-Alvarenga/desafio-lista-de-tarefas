using CRUDAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CRUDAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly Contexto _contexto;

        public UsersController(Contexto contexto)
        {
            _contexto = contexto;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<User>))]
        public async Task<ActionResult<IEnumerable<User>>> RecuperarTodosAsync()
        {
            return await _contexto.Users.ToListAsync();
        }

        [HttpGet("{userId}")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(404)]
        public async Task<ActionResult<User>> RecuperarUserByIdAsync(int userId)
        {
            User user = await _contexto.Users.FindAsync(userId);

            if (user == null)
                return NotFound();
            
            return user;
        }

        [HttpGet("login/{email}/{senha}")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(404)]
        public async Task<ActionResult<User>> LoginAsync(string email, string senha)
        {
            User user = await _contexto.Users.FirstOrDefaultAsync(u => u.email == email && u.senha == senha);

            if (user == null)
                return NotFound();
            
            return user;
        }

        [HttpPost]
        [ProducesResponseType(200)]
        public async Task<ActionResult<User>> CriarUserAsync(User user)
        {
            await _contexto.Users.AddAsync(user);
            await _contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        [ProducesResponseType(200)]
        public async Task<ActionResult> AtualizarUserAsync(User user)
        {
            _contexto.Users.Update(user);
            await _contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{userId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> ExcluirUserAsync(int userId)
        {
            User user = await _contexto.Users.FindAsync(userId);
            _contexto.Tasks.RemoveRange(_contexto.Tasks.Where(t => t.UserId == userId));
            _contexto.Remove(user);

            await _contexto.SaveChangesAsync();
            return Ok();
        }
    }
}
