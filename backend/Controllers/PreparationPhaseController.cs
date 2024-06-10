using AutoMapper;
using backend.Data;
using backend.DTOs.PreparationPhase;
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
    public class PreparationPhaseController : Controller
    {
        private readonly Arm_moContext _context;
        private readonly IMapper _mapper;
        public PreparationPhaseController(Arm_moContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpPost("Create")]
        public IActionResult Create([FromBody] CreatePreparationPhaseDTO createPreparationPhaseDTO)
        {
            // Convert the DTO into a Goal object that EF can understand.
            var preparationPhase = _mapper.Map<Models.PreparationPhase>(createPreparationPhaseDTO);

            _context.PreparationPhase.Add(preparationPhase);

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
            var preparationPhase = _context.PreparationPhase
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

        [HttpPut("Update")]
        public async Task<ActionResult> Update([FromBody] PreparationPhase perparationPhase)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var existingpreparationPhase = await _context.PreparationPhase
                    .FirstOrDefaultAsync(g => g.Id == perparationPhase.Id);

                if (existingpreparationPhase == null)
                {
                    return NotFound("Preparation Phase not found" + perparationPhase); // Return 404 Not Found if Preparation Phase is not found
                }

                existingpreparationPhase.Duration = perparationPhase.Duration;
                existingpreparationPhase.Motivation = perparationPhase.Motivation;
                existingpreparationPhase.Expectation = perparationPhase.Expectation;
                existingpreparationPhase.Distractions = perparationPhase.Distractions;
                existingpreparationPhase.StartDateTime = perparationPhase.StartDateTime;
                existingpreparationPhase.EndDateTime = perparationPhase.EndDateTime;

                // Save changes to the database
                await _context.SaveChangesAsync();

                return Ok("Preparation Phase updated successfully"); // Return 200 OK on successful update
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, "An error occurred while updating the Preparation Phase"); // Return 500 Internal Server Error on database error
            }
        }

        [HttpDelete("Delete/{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var existinexistingpreparationPhase = await _context.PreparationPhase.FindAsync(id);
                if (existinexistingpreparationPhase == null)
                {
                    return NotFound("Preparation Phase not found"); // Return 404 Not Found if Preparation Phase is not found
                }

                _context.PreparationPhase.Remove(existinexistingpreparationPhase);
                await _context.SaveChangesAsync(); // Save changes to the database

                return Ok("Preparation Phase deleted successfully"); // Return 200 OK on successful deletion
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, "An error occurred while deleting the Preparation Phase"); // Return 500 Internal Server Error on database error
            }
        }


    }
}