using System.Data;
using System.Data.SQLite;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Dapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.Configuration;

namespace Application.Aikataulus
{
    public class CreateDapper
    {
        public class Command : IRequest<Result<Unit>>
        {
            public AikatauluFromBackend AikatauluFromBackend { get; set; }
        }

        //Validate against Command because it has the AikatauluFromBackend from API
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.AikatauluFromBackend).SetValidator(new AikatauluFromBackendValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration config)
            {
                _configuration = config;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                
                AikatauluFromBackend a = request.AikatauluFromBackend;

                string queryString = @"INSERT INTO rk2aikataulu 
                (date1, starttime, code, target, synthesis, qc, release1, transport2, duration, gap, route, cyclotron) "+
                @$"VALUES ('{a.Date1.ToString("yyyy-MM-dd")}',
                '{a.Starttime.ToString("HH:mm:ss").Replace('.',':')}',
                '{a.Code}',
                '{a.Target}',
                '{a.Synthesis}',
                '{a.Qc}',
                '{a.Release1}',
                '{a.Transport2}',
                '00:10:00',
                '0001-01-01 00:00:00',
                '', '')"; 

                using (IDbConnection cnn = new SQLiteConnection(_configuration.GetConnectionString("DefaultConnection2"))) //"DefaultConnection1"
                {
                    cnn.Open();
                    //If cnn.Execute returns more than 0 changes result = true;
                    var result = await cnn.ExecuteAsync(queryString, new DynamicParameters()) > 0;
                    
                    //Check if result was a failure
                    if (!result) return Result<Unit>.Failure("Failed to create SynthesisBatch");

                    //Return nothing. Mandatory with MediatR.
                    return Result<Unit>.Success(Unit.Value);
                } 
            }
        }

    }
}