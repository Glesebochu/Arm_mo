using AutoMapper;
using backend.Data;
using backend.DTOs.Goal;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using backend.Interfaces;


namespace backend.Controllers
{
    [Route("backend/[controller]")]
    [ApiController]
    public class GoalsController : Controller
    {
        private readonly Arm_moContext _context;
        private readonly IMapper _mapper;
        private readonly IGoalRepository _goalRepo;
        public GoalsController(Arm_moContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // An action for getting/reading all the goals
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            var goals = _context.Goals
                .Include(g => g.Activity)
                .Include(g => g.MeditationObject)
                .ToList();

            // Map goals to DTOs
            var goalDTOs = _mapper.Map<List<GoalDTO>>(goals);

            return Ok(goalDTOs);
        }

        // private GoalDTO MapGoalToDTO(Goal goal)
        // {
        //     var goalDTO = new GoalDTO
        //     {
        //         Status = goal.Status.ToString(),
        //         DueDate = goal.DueDate,
        //         CompletedDate = goal.CompletedDate,
        //         Activity = goal.Activity?.Title,
        //         MeditationObject = goal.MeditationObject?.Title,
        //         ChildGoals = goal.ChildGoals?.Select(child => MapGoalToDTO(child)).ToList()
        //     };

        //     return goalDTO;
        // }
        // An action for getting/reading a single goal
        [HttpGet("GetById/{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var goal = _context.Goals
                .Include(g => g.Activity)
                .Include(g => g.MeditationObject)
                .Include(g => g.ChildGoals)
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
        [HttpDelete("Delete/{id:int}")]
        public async Task<ActionResult> Delete(int id)
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
        public async Task<ActionResult> Update(int id, [FromBody] UpdateGoalDTO updateGoalDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                // Find the goal by ID
                var existingGoal = await _context.Goals
                    .Include(g => g.Activity)
                    .Include(g => g.MeditationObject)
                    .FirstOrDefaultAsync(g => g.Id == id);

                if (existingGoal == null)
                {
                    return NotFound("Goal not found"); // Return 404 Not Found if goal is not found
                }

                // Map the UpdateGoalDTO to the existing Goal entity
                existingGoal.Status = updateGoalDto.Status;
                existingGoal.DueDate = updateGoalDto.DueDate;
                existingGoal.CompletedDate = updateGoalDto.CompletedDate;

                // Update the titles of the Activity and MeditationObject
                if (existingGoal.Activity != null)
                {
                    existingGoal.Activity.Title = updateGoalDto.Activity;
                }
                if (existingGoal.MeditationObject != null)
                {
                    existingGoal.MeditationObject.Title = updateGoalDto.MeditationObject;
                }

                // Save changes to the database
                await _context.SaveChangesAsync();

                return Ok("Goal updated successfully"); // Return 200 OK on successful update
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, "An error occurred while updating the goal"); // Return 500 Internal Server Error on database error
            }
        }


        //     [HttpPut]
        //     [Route("{id:int}")]
        //     public async Task<IActionResult> Update([FromRoute] int id, [FromBody] GoalDTO goalDto)
        //     {
        //         if (!ModelState.IsValid)
        //             return BadRequest(ModelState);

        //         var GoalDTOs = await _goalRepo.UpdateAsync(id, goalDto);

        //         if (GoalDTOs == null)
        //         {
        //             return NotFound();
        //         }

        //         return Ok(GoalDTOs);
        //     }

        // }


    }
}

