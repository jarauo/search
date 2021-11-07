using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using MediatR;
using Application.SynthesisBatches;

namespace API.Controllers
{
    public class SynthesisBatchController : BaseApiController
    {
        
        /*
        End point for returning all syntheses from database that match to the given parameters
        */
        [HttpGet]
        public async Task<ActionResult<List<SynthesisBatch>>> GetSynthesisBatches(string batchnumber, string date, string starttime, string endtime, string targetryperson, string synthesisperson, string qcperson, string releaser, string cyclotron) 
        {
            //return Ok();
            return await Mediator.Send(new List.Query{BatchNumber = batchnumber, Date = date, StartTime = starttime, EndTime = endtime, TargetryPerson = targetryperson, SynthesisPerson = synthesisperson, QCPerson = qcperson, Releaser = releaser, Cyclotron = cyclotron});
        }

        /*
        End point for returning a single synthesis that corresponds to specified id
        */
        [HttpGet("{id}")]
        public async Task<ActionResult<SynthesisBatch>> GetSynthesisBatch(Guid id)
        {
            //return Ok();
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateSynthesisBatch(SynthesisBatch synthesisbatch)
        {
            return Ok(await Mediator.Send(new Create.Command {SynthesisBatch = synthesisbatch}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditSynthesisBatch(Guid id, SynthesisBatch synthesisbatch)
        {
            synthesisbatch.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{SynthesisBatch = synthesisbatch}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSynthesisBatch(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }


        /*
        DEPRECATED: Functionality transferred to MediatR and to the Application section of the program.
        Custom End Point with multiple optional parameter support. 
        TO DO: 
         - add all wanted parameters
         - check if all parameters are null then make the date parameter to be current year by default so that the query won't 
           return the whole table
        
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
            
            
            //return await ctx.ToListAsync();
            //return await _context.SynthesisBatch.Where(s => s.SynthesisPerson == synthesisMaker && s.BatchNumber == synthesisCode).ToListAsync();
            return Ok();
        }
        */
    }
}