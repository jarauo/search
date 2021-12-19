using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Aikataulus;
using Microsoft.AspNetCore.Mvc;
using Domain;

namespace API.Controllers
{
    public class AikatauluFromBackendController : BaseApiController
    {
         /*
        End point for returning all syntheses from database that match to the given parameters
        */
        [HttpGet]
        public async Task<IActionResult> GetAikatauluFromBackend(int weekNumber) 
        {
            //return Ok();
            //return HandleResult(await Mediator.Send(new List.Query{}));
            return HandleResult(await Mediator.Send(new ListDapper.Query{WeekNumber = weekNumber}));
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetSearch(DateTime date1, string code, string synthesis, string release1, string transport2) 
        {
            return HandleResult(await Mediator.Send(new SearchDapper.Query{Date1 = date1, Code = code}));
        }



        /*
        End point for returning a single synthesis that corresponds to a specific id
        */
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetASingleAikatauluFromBackend(int id)
        {
            //return Ok();
            //return await Mediator.Send(new Details.Query{Id = id});
            return HandleResult(await Mediator.Send(new DetailsDapper.Query{Id = id}));
        }
        
        [HttpPost]
        public async Task<IActionResult> CreateAikatauluFromBackend(AikatauluFromBackend aikatatauluFromBackend)
        {
            return HandleResult(await Mediator.Send(new CreateDapper.Command {AikatauluFromBackend = aikatatauluFromBackend}));
        }

        [HttpPut]
        public async Task<IActionResult> EditAikatauluFromBackend(AikatauluFromBackend aikatauluFromBackend)
        {
            //synthesisbatch.Id = id;
            return HandleResult(await Mediator.Send(new EditDapper.Command{AikatauluFromBackend = aikatauluFromBackend}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSynthesisBatch(int id)
        {
            return HandleResult(await Mediator.Send(new DeleteDapper.Command{Id = id}));
        }

    }
}