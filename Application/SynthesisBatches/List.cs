using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Domain;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;
using Microsoft.Extensions.Configuration;

namespace Application.SynthesisBatches
{
    public class List
    {
        public class Query : IRequest<Result<List<SynthesisBatch>>> {
            
            /*
            public String BatchNumber { get; set; }
            public String Date { get; set; }
            public String StartTime { get; set; }
            public String EndTime { get; set; }
            public String TargetryPerson { get; set; }
            public String SynthesisPerson { get; set; }
            public String QCPerson { get; set; }
            public String Releaser { get; set; }
            public String Cyclotron { get; set; }
            */
        }

        public class Handler : IRequestHandler<Query, Result<List<SynthesisBatch>>>
        {
            private readonly DataContext _context;
            //private readonly IConfiguration _configuration;
            public Handler(DataContext context)
            {
                _context = context;
                //_configuration = config;
            }

            public async Task<Result<List<SynthesisBatch>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<SynthesisBatch>>.Success( await _context.SynthesisBatch.ToListAsync(cancellationToken));
                

                
                //Check if all parameters are null give a default parameter to decrease the query result
                //var synthesisMakerCompare = request.SynthesisPerson;

                /* Commented for testing
                if (String.IsNullOrEmpty(request.BatchNumber) && String.IsNullOrEmpty(request.Date) &&
                String.IsNullOrEmpty(request.StartTime) && String.IsNullOrEmpty(request.EndTime) &&
                String.IsNullOrEmpty(request.TargetryPerson) && String.IsNullOrEmpty(request.SynthesisPerson) &&
                String.IsNullOrEmpty(request.QCPerson) && String.IsNullOrEmpty(request.Releaser) && String.IsNullOrEmpty(request.Cyclotron)) {
                    synthesisMakerCompare = "JU";
                }
                */

                //LINQ with given parameters and exclude the nulls
                /*
                var ctx = from s in _context.SynthesisBatch
                where (s.BatchNumber == request.BatchNumber || request.BatchNumber == null) &&
                (s.Date.ToString() == request.Date || request.Date == null) &&
                (s.StartTime == request.StartTime || request.StartTime == null) &&
                (s.EndTime == request.EndTime || request.EndTime == null) &&
                (s.TargetryPerson == request.TargetryPerson || request.TargetryPerson == null) &&
                (s.SynthesisPerson == synthesisMakerCompare || synthesisMakerCompare == null) &&
                (s.QCPerson == request.QCPerson || request.QCPerson == null) &&
                (s.Releaser == request.Releaser || request.Releaser == null) &&
                (s.Cyclotron == request.Cyclotron || request.Cyclotron == null) 
                select s;
            
                return await ctx.ToListAsync();
                //return Ok(); 
                */  
            }
        }
    }
}