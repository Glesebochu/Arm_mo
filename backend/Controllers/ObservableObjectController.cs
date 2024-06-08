using AutoMapper;
using backend.Data;
using backend.DTOs.ObservableObject;
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
    public class ObservableObjectsController : Controller
    {
        private readonly Arm_moContext _context;
        private readonly IMapper _mapper;

        public ObservableObjectsController(Arm_moContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // An action for getting/reading all the observable objects
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            var observableObjects = _context.ObservableObjects.ToList();

            // Map observable objects to DTOs
            var observableObjectDTOs = _mapper.Map<List<ObservableObjectDTO>>(observableObjects);

            return Ok(observableObjectDTOs);
        }

        // An action for getting/reading a single observable object
        [HttpGet("GetById/{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var observableObject = _context.ObservableObjects.Find(id);

            if (observableObject == null)
            {
                return NotFound();
            }

            var observableObjectDTO = _mapper.Map<ObservableObjectDTO>(observableObject);

            return Ok(observableObjectDTO);
        }

        // An action for creating a new observable object
        [HttpPost("Create")]
        public IActionResult Create([FromBody] ObservableObjectDTO newObservableObject)
        {
            var observableObject = _mapper.Map<ObservableObject>(newObservableObject);

            _context.ObservableObjects.Add(observableObject);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetById), new { id = observableObject.Id }, observableObject);
        }

        // An action for updating an existing observable object
        [HttpPut("Update")]
        public IActionResult Update([FromBody] ObservableObjectDTO updatedObservableObject)
        {
            var existingObservableObject = _context.ObservableObjects.Find(updatedObservableObject.Id);

            if (existingObservableObject == null)
            {
                return NotFound();
            }

            _mapper.Map(updatedObservableObject, existingObservableObject);
            _context.SaveChanges();

            return Ok("Observable object updated successfully");
        }

        // An action for deleting an observable object
        [HttpDelete("Delete/{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var observableObject = _context.ObservableObjects.Find(id);

            if (observableObject == null)
            {
                return NotFound();
            }

            _context.ObservableObjects.Remove(observableObject);
            _context.SaveChanges();

            return Ok("Observable object deleted successfully");
        }
    }
}
