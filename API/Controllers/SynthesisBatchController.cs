using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class SynthesisBatchController : BaseApiController
    {
        private readonly DataContext _context;

        public SynthesisBatchController(DataContext context)
        {
            _context = context;
        }
        
        /*
        End point for returning all syntheses from database
        */
        [HttpGet]
        public async Task<ActionResult<List<SynthesisBatch>>> GetSynthesisBatches() 
        {
            return await _context.SynthesisBatch.ToListAsync();
        }

        /*
        End point for returning a synthesis that corresponds to specified id
        */
        [HttpGet("{id}")]
        public async Task<ActionResult<SynthesisBatch>> GetSynthesisBatch(Guid id)
        {
            return await _context.SynthesisBatch.FindAsync(id);
        }

        /*
        Custom End Point with multiple optional parameter support. 
        TO DO: 
         - add all wanted parameters
         - check if all parameters are null then make the date parameter to be current year by default so that the query won't 
           return the whole table
        */
        [HttpGet("bySearch")]
        public async Task<ActionResult<List<SynthesisBatch>>> Get([FromQuery] string synthesisCode,[FromQuery] string synthesisMaker) {
            var synthesisMakerCompare = synthesisMaker;
            if (String.IsNullOrEmpty(synthesisCode) && String.IsNullOrEmpty(synthesisMaker) ) {
                synthesisMakerCompare = "JU";
            }
            
            
            var ctx = from s in _context.SynthesisBatch
            where (s.SynthesisPerson == synthesisMakerCompare || synthesisMaker == null) &&
            (s.BatchNumber == synthesisCode || synthesisCode == null)
            select s;
            
            
            return await ctx.ToListAsync();
            //return await _context.SynthesisBatch.Where(s => s.SynthesisPerson == synthesisMaker && s.BatchNumber == synthesisCode).ToListAsync();
        }
    }
}