using AutoMapper;
using backend.Data;
using backend.DTOs.Goal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("backend/[controller]")]
    [ApiController]
    public class GoalsController : Controller
    {
        private readonly Arm_moContext _context;
        private readonly IMapper _mapper;
        public GoalsController(Arm_moContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        // An action for getting/reading all the goals
        [HttpGet]
        public IActionResult GetAll(){
            var goals = _context.Goals
                .Include(g => g.Id)
                .Include(g => g.Activity)
                .Include(g => g.MeditationObject)
                .ToList();
            var goalDTOs = _mapper.Map<List<GoalDTO>>(goals);

            return Ok(goalDTOs);
        }
        [HttpGet]
        public IActionResult GetAllWithId(){
            var goals = _context.Goals
                .Include(g => g.Activity)
                .Include(g => g.MeditationObject)
                .ToList();
            var goalDTOIds = _mapper.Map<List<GoalDTOId>>(goals);

            return Ok(goalDTOIds);
        }
        // An action for getting/reading a single goal
        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id){


            var goal = _context.Goals
                .Include(g => g.ChildGoals)
                .Include(g => g.Activity)
                .Include(g => g.MeditationObject)
                .FirstOrDefault(g => g.Id == id);


            if (goal == null){
                return NotFound();
            }else{
                return Ok(_mapper.Map<GoalDTO>(goal));
            }
        }


        // An action for creating a goal; GET
        // An action for creating a goal; POST
        [HttpPost]
        [ActionName("Create")]
        public IActionResult Create([FromBody] CreateGoalDTO createGoalDTO){
            // Convert the DTO into a Goal object that EF can understand.
            var goal = _mapper.Map<Models.Goal>(createGoalDTO);

            // Add the goal to the Goals table.
            _context.Goals.Add(goal);

            // Save changes.
            _context.SaveChanges();

            return CreatedAtAction(
                nameof(GetById), 
                new {id = goal.Id},
                _mapper.Map<GoalDTO>(goal)
            );

        }
        
    }
}
