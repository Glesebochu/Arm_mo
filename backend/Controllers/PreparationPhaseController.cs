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

    }
}