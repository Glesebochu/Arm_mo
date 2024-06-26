using AutoMapper;
using backend.Data;
using backend.DTOs.Session;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("backend/[controller]")]
    [ApiController]
    public class SessionsController : Controller
    {
        private readonly Arm_moContext _context;
        private readonly IMapper _mapper;
        private readonly SessionService _sessionService;
        public SessionsController(Arm_moContext context, IMapper mapper, SessionService sessionService)
        {
            _context = context;
            _mapper = mapper;
            _sessionService = sessionService;
        }

        // Action for getting all sessions
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            var sessions = _context.Sessions
                .Include(s => s.Meditator)
                .Include(s => s.AhaMoments)
                .Include(s => s.ObservableObjects)
                .Include(s => s.PreparationPhase)
                .ToList();

            var sessionDTOs = _mapper.Map<List<SessionDTO>>(sessions);

            return Ok(sessionDTOs);
        }

        // Action for getting a single session by ID
        [HttpGet("GetById/{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var session = _context.Sessions
                .Include(s => s.Meditator)
                .Include(s => s.AhaMoments)
                .Include(s => s.ObservableObjects)
                .Include(s => s.PreparationPhase)
                .FirstOrDefault(s => s.Id == id);

            if (session == null)
            {
                return NotFound();
            }

            var sessionDTO = _mapper.Map<SessionDTO>(session);

            return Ok(sessionDTO);
        }

        // Action for creating a session; POST
        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody] CreateSessionDTO createSessionDTO)
        {
            var session = await _sessionService.CreateSessionAsync(createSessionDTO);

            return CreatedAtAction(
                nameof(GetById),
                new { id = session.Id },
                _mapper.Map<SessionDTO>(session)
            );
        }

        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete(int sessionId)
        {
            var sessionToDelete = await _context.Sessions
                .Where(s => s.Id == sessionId && !s.IsDeleted)
                .FirstOrDefaultAsync();

            if (sessionToDelete == null)
            {
                return NotFound("A session with that Id does not exist");
            }
            else
            {
                sessionToDelete.IsDeleted = true;
                await _context.SaveChangesAsync();
                return Ok("Deleted Session with Id: " + sessionToDelete.Id);
            }
        }

    }
}
