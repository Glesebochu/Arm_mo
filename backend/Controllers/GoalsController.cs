using AutoMapper;
using backend.Data;
using backend.DTOs.Goal;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

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
        public IActionResult GetAll()
        {
            var goals = _context.Goals
                .Include(g => g.Activity)
                .Include(g => g.MeditationObject)
                .ToList();

            // Map goals to DTOs
            var goalDTOs = goals.Select(g => MapGoalToDTO(g)).ToList();

            return Ok(goalDTOs);
        }

        private GoalDTO MapGoalToDTO(Goal goal)
        {
            var goalDTO = new GoalDTO
            {
                Status = goal.Status.ToString(),
                DueDateTime = goal.DueDateTime,
                CompletedDateTime = goal.CompletedDateTime,
                Activity = goal.Activity?.Title,
                MeditationObject = goal.MeditationObject?.Title,
                ChildGoals = goal.ChildGoals?.Select(child => MapGoalToDTO(child)).ToList()
            };

            return goalDTO;
        }
        // An action for getting/reading a single goal
        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {


            var goal = _context.Goals
                .Include(g => g.ChildGoals)
                .Include(g => g.Activity)
                .Include(g => g.MeditationObject)
                .FirstOrDefault(g => g.Id == id);


            if (goal == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(_mapper.Map<GoalDTO>(goal));
            }
        }


        // An action for creating a goal; GET
        // An action for creating a goal; POST
        [HttpPost("Create")]
        [ActionName("Create")]
        public IActionResult Create([FromBody] CreateGoalDTO createGoalDTO)
        {
            // Convert the DTO into a Goal object that EF can understand.
            var goal = _mapper.Map<Models.Goal>(createGoalDTO);

            // Add the goal to the Goals table.
            _context.Goals.Add(goal);

            // Save changes.
            _context.SaveChanges();

            return CreatedAtAction(
                nameof(GetById),
                new { id = goal.Id },
                _mapper.Map<GoalDTO>(goal)
            );

        }
        
        // An action for deleting a goal; POST
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteGoal(int id)
        {
            try
            {
                // Find the goal by ID
                var existingGoal = await _context.Goals.FindAsync(id);
                if (existingGoal == null)
                {
                    return NotFound("Goal not found"); // Return 404 Not Found if goal is not found
                }

                // Remove the goal from the database
                _context.Goals.Remove(existingGoal);
                await _context.SaveChangesAsync(); // Save changes to the database

                return Ok("Goal deleted successfully"); // Return 200 OK on successful deletion
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, "An error occurred while deleting the goal"); // Return 500 Internal Server Error on database error
            }
        }

        // An action for updating a goal; POST
        [HttpPut("Update/{id}")]
        public async Task<ActionResult> UpdateGoal(int id, GoalDTO goalDTO)
        {
            try
            {
                // Find the goal by ID
                var existingGoal = await _context.Goals.FindAsync(id);
                if (existingGoal == null)
                {
                    return NotFound("Goal not found"); // Return 404 Not Found if goal is not found
                }

                // Update the properties of the existing goal entity
                existingGoal.Status = (GoalStatus)Enum.Parse(typeof(GoalStatus), goalDTO.Status);
                existingGoal.DueDateTime = goalDTO.DueDateTime;
                existingGoal.CompletedDateTime = goalDTO.CompletedDateTime;
                // Update other properties as needed

                // Save changes to the database
                await _context.SaveChangesAsync();

                return Ok("Goal updated successfully"); // Return 200 OK on successful update
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, "An error occurred while updating the goal"); // Return 500 Internal Server Error on database error
            }
        }


    }


}

