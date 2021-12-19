using System.Data;
using System.Data.SQLite;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Dapper;
using MediatR;
using Microsoft.Extensions.Configuration;

namespace Application.Aikataulus
{
    public class DeleteDapper
    {
        public class Command : IRequest<Result<Unit>>
        {
            public int Id { get; set; }
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
                //SQL for deleting AikatauluFromBackend that matches the Id value.
                string transactionString = $"DELETE FROM rk2aikataulu where id = {request.Id}";
            
                using (IDbConnection cnn = new SQLiteConnection(_configuration.GetConnectionString("DefaultConnection2"))) //"DefaultConnection1"
                {
                    cnn.Open();
                    //If cnn.Execute returns more than 0 changes result = true;
                    var result = await cnn.ExecuteAsync(transactionString) > 0;
                    
                    //Check if result was a failure
                    if (!result) return Result<Unit>.Failure("Failed to delete the SynthesisBatch");

                    //Return nothing. Mandatory with MediatR.
                    return Result<Unit>.Success(Unit.Value);
                }
            }
        }
    }
}