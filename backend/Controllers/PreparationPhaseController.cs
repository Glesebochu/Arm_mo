using AutoMapper;
using backend.Data;
using backend.DTOs.PreparationPhase;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.DTOs.Hindrance;
using System.Collections.Generic;
using System.Linq;
using backend.Interfaces;

namespace backend.Controllers
{
    [Route("backend/[controller]")]
    [ApiController]
    public class PreparationPhaseController : Controller
    {
        private readonly Arm_moContext _context;
        private readonly IMapper _mapper;
        public PreparationPhaseController(Arm_moContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // method to creater a preparation phase
        [HttpPost("Create")]
        public IActionResult Create([FromBody] CreatePreparationPhaseDTO createPreparationPhaseDTO)
        {
            // Convert the DTO into a Goal object that EF can understand.
            var preparationPhase = _mapper.Map<Models.PreparationPhase>(createPreparationPhaseDTO);

            _context.PreparationPhases.Add(preparationPhase);

            // Save changes.
            _context.SaveChanges();

            return CreatedAtAction(
                nameof(GetById),
                new { id = preparationPhase.Id },
                _mapper.Map<CreatePreparationPhaseDTO>(preparationPhase)

            );

        }

        [HttpGet("GetById/{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var preparationPhase = _context.PreparationPhases
                .FirstOrDefault(g => g.Id == id);

            if (preparationPhase == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(_mapper.Map<CreatePreparationPhaseDTO>(preparationPhase));
            }
        }

        // [HttpPut("Update")]
        // public async Task<ActionResult> UpdatePreparationPhase([FromBody] PreparationPhaseDTO preparationPhaseDto)
        // {
        //     if (!ModelState.IsValid)
        //         return BadRequest(ModelState);

        //     try
        //     {
        //         // Find the preparation phase by ID
        //         var existingPreparationPhase = await _context.PreparationPhases
        //             .Include(pp => pp.Goals)
        //             .Include(pp => pp.Distractions)
        //             .FirstOrDefaultAsync(pp => pp.Id == preparationPhaseDto.Id);

        //         if (existingPreparationPhase == null)
        //         {
        //             return NotFound("Preparation phase not found");
        //         }

        //         // Map the preparationPhaseDto to the existing PreparationPhase entity
        //         _mapper.Map(preparationPhaseDto, existingPreparationPhase);

        //         // Update Goals
        //         var existingGoalIds = existingPreparationPhase.Goals.Select(g => g.Id).ToList();
        //         var newGoalIds = preparationPhaseDto.Goals.Select(g => g.Id).ToList();

        //         // Remove goals that are not in the new list
        //         foreach (var goal in existingPreparationPhase.Goals.Where(g => !newGoalIds.Contains(g.Id)).ToList())
        //         {
        //             _context.Goals.Remove(goal);
        //         }

        //         // Add or update goals
        //         foreach (var goalDto in preparationPhaseDto.Goals)
        //         {
        //             var existingGoal = existingPreparationPhase.Goals.FirstOrDefault(g => g.Id == goalDto.Id);
        //             if (existingGoal != null)
        //             {
        //                 _mapper.Map(goalDto, existingGoal); // Update existing goal
        //             }
        //             else
        //             {
        //                 var newGoal = _mapper.Map<Goal>(goalDto);
        //                 existingPreparationPhase.Goals.Add(newGoal); // Add new goal
        //             }
        //         }

        //         // Update Distractions
        //         var existingDistractionIds = existingPreparationPhase.Distractions.Select(d => d.Id).ToList();
        //         var newDistractionIds = preparationPhaseDto.Distractions.Select(d => d.Id).ToList();

        //         // Remove distractions that are not in the new list
        //         foreach (var distraction in existingPreparationPhase.Distractions.Where(d => !newDistractionIds.Contains(d.Id)).ToList())
        //         {
        //             _context.Hindrances.Remove(distraction);
        //         }

        //         // Add or update distractions
        //         foreach (var distractionDto in preparationPhaseDto.Distractions)
        //         {
        //             var existingDistraction = existingPreparationPhase.Distractions.FirstOrDefault(d => d.Id == distractionDto.Id);
        //             if (existingDistraction != null)
        //             {
        //                 _mapper.Map(distractionDto, existingDistraction); // Update existing distraction
        //             }
        //             else
        //             {
        //                 var newDistraction = _mapper.Map<Hindrance>(distractionDto);
        //                 existingPreparationPhase.Distractions.Add(newDistraction); // Add new distraction
        //             }
        //         }

        //         // Save changes to the database
        //         await _context.SaveChangesAsync();

        //         return Ok("Preparation phase updated successfully");
        //     }
        //     catch (DbUpdateException)
        //     {
        //         return StatusCode(500, "An error occurred while updating the preparation phase");
        //     }
        // }


        // [HttpDelete("Delete/{id:int}")]
        // public async Task<ActionResult> Delete(int id)
        // {
        //     try
        //     {
        //         var existinexistingpreparationPhase = await _context.PreparationPhases.FindAsync(id);
        //         if (existinexistingpreparationPhase == null)
        //         {
        //             return NotFound("Preparation Phase not found"); // Return 404 Not Found if Preparation Phase is not found
        //         }

        //         _context.PreparationPhases.Remove(existinexistingpreparationPhase);
        //         await _context.SaveChangesAsync(); // Save changes to the database

        //         return Ok("Preparation Phase deleted successfully"); // Return 200 OK on successful deletion
        //     }
        //     catch (DbUpdateException)
        //     {
        //         return StatusCode(500, "An error occurred while deleting the Preparation Phase"); // Return 500 Internal Server Error on database error
        //     }
        // }


    }
}