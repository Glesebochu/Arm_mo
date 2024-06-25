using AutoMapper;
using backend.Data;
using backend.DTOs.Session;
using backend.Models;
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
        public SessionsController(Arm_moContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
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
        public IActionResult Create([FromBody] CreateSessionDTO createSessionDTO)
        {
            var session = new Session
            {
                StartDateTime = createSessionDTO.StartDateTime,
                EndDateTime = createSessionDTO.EndDateTime,
                Meditator = _context.Meditators.Find(createSessionDTO.MeditatorId),
                AhaMoments = _mapper.Map<List<AhaMoment>>(createSessionDTO.AhaMoments),
                ObservableObjects = _mapper.Map<List<ObservableObject>>(createSessionDTO.ObservableObjects),
                PreparationPhase = _mapper.Map<PreparationPhase>(createSessionDTO.PreparationPhase),
                IsDeleted = createSessionDTO.IsDeleted
            };

            // Code for adding practiced stages one by one from the list of integers

            // currentStage = _context.Stages.Find(createSessionDTO.PracticedStageIds[0]);
            // var practicedStage = new PracticedStage{ Session = session, Stage = currentStage };
            // _context.PracticedStages.Add(PracticedStage);

            _context.Sessions.Add(session);
            _context.SaveChanges();

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
