using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.Configuration;
using Domain;
using Application.Core;
using Dapper;
using System.Threading;
using System.Data;
using System.Data.SQLite;

namespace Application.Aikataulus
{
    public class EditDapper
    {
        public class Command : IRequest<Result<Unit>>
        {
            public AikatauluFromBackend AikatauluFromBackend { get; set; }
            public int Id {get; set;}
        }


        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private IConfiguration _configuration;
            private readonly IMapper _mapper;

            public Handler(IConfiguration config, IMapper mapper)
            {
                _configuration = config;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                //Get a synthesisBatch from database
                AikatauluFromBackend a = request.AikatauluFromBackend;

                //var aikatauluFromBackend = await Mediator.Send(new DetailsDapper.Query{Id = jeba.Id});

                //if (synthesisbatch == null) return null;
                string transactionString = @$"UPDATE rk2aikataulu SET
                target = '{a.Target}', 
                synthesis = '{a.Synthesis}',
                qc = '{a.Qc}',
                release1 = '{a.Release1}',
                transport2 = '{a.Transport2}'
                WHERE id ={a.Id}";


                using (IDbConnection cnn = new SQLiteConnection(_configuration.GetConnectionString("DefaultConnection2"))) //"DefaultConnection1"
                {
                    cnn.Open();
                    //If cnn.Execute returns more than 0 changes result = true;
                    var result = await cnn.ExecuteAsync(transactionString) > 0;
                    
                    //Check if result was a failure
                    if (!result) return Result<Unit>.Failure("Failed to edit SynthesisBatch");

                    //Return nothing. Mandatory with MediatR.
                    return Result<Unit>.Success(Unit.Value);
                } 
            }
        }
    }
}