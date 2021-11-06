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
        [HttpGet]
        public async Task<ActionResult<List<SynthesisBatch>>> GetSynthesisBatches() 
        {
            return await _context.SynthesisBatch.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<SynthesisBatch>> GetSynthesisBatch(Guid id)
        {
            return await _context.SynthesisBatch.FindAsync(id);
        }
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