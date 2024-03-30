using CRUDAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRUDAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly Contexto _contexto;

        public TasksController(Contexto contexto)
        {
            _contexto = contexto;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Models.Task>))]
        public async Task<ActionResult<IEnumerable<Models.Task>>> RecuperarTodosAsync()
        {
            return await _contexto.Tasks.ToListAsync();
        }

        [HttpGet("usertasks/{userId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Models.Task>))]
        [ProducesResponseType(404)]
        public async Task<ActionResult<IEnumerable<Models.Task>>> RecuperarTasksFromUserAsync(int userId)
        {
            var tasks = await _contexto.Tasks.Where(t => t.UserId == userId).ToListAsync();

            if (!tasks.Any())
                return NotFound();
            
            return Ok(tasks);
        }

        [HttpGet("usertasks/{userId}/completas")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Models.Task>))]
        [ProducesResponseType(404)]
        public async Task<ActionResult<IEnumerable<Models.Task>>> RecuperarTasksCompletasFromUserAsync(int userId)
        {
            var tasks = await _contexto.Tasks.Where(t => t.UserId == userId && t.IsComplete).ToListAsync();

            if (!tasks.Any())
                return NotFound();
            
            return Ok(tasks);
        }

        [HttpGet("usertasks/{userId}/incompletas")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Models.Task>))]
        [ProducesResponseType(404)]
        public async Task<ActionResult<IEnumerable<Models.Task>>> RecuperarTasksIncompletasFromUserAsync(int userId)
        {
            var tasks = await _contexto.Tasks.Where(t => t.UserId == userId && !t.IsComplete).ToListAsync();

            if (!tasks.Any())
                return NotFound();
            
            return Ok(tasks);
        }

        [HttpGet("{taskId}")]
        [ProducesResponseType(200, Type = typeof(Models.Task))]
        [ProducesResponseType(404)]
        public async Task<ActionResult<Models.Task>> RecuperarTaskByIdAsync(int taskId)
        {
            Models.Task task = await _contexto.Tasks.FindAsync(taskId);

            if (task == null)
                return NotFound();
            
            return task;
        }

        [HttpPost]
        [ProducesResponseType(200)]
        public async Task<ActionResult<Models.Task>> CriarTaskAsync(Models.Task task)
        {
            await _contexto.Tasks.AddAsync(task);
            await _contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        [ProducesResponseType(200)]
        public async Task<ActionResult> AtualizarTaskAsync(Models.Task task)
        {
            _contexto.Tasks.Update(task);
            await _contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{taskId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> ExcluirTaskAsync(int taskId)
        {
            Models.Task task = await _contexto.Tasks.FindAsync(taskId);
            if (task == null)
                return NotFound();

            _contexto.Remove(task);
            await _contexto.SaveChangesAsync();
            return Ok();
        }
    }
}
