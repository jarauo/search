using System.Data;
using System.Data.SQLite;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Microsoft.Extensions.Configuration;
using Dapper;
using Domain;
using System.Threading;

namespace Application.Aikataulus
{
    public class DetailsDapper
    {
        public class Query : IRequest<Result<AikatauluFromBackend>>
        {
            public int Id { get; set; }    //vain tämä jos haluaa id:n perusteella

        }

        public class Handler : IRequestHandler<Query, Result<AikatauluFromBackend>>
        {
        private readonly IConfiguration _configuration;
            public Handler(IConfiguration config)
            {
                _configuration = config;
            }

            public async Task<Result<AikatauluFromBackend>> Handle(Query request, CancellationToken cancellationToken)
            {

                string queryString = @$"Select id, date1, code, number, starttime, time(starttime, duration) as 'endtime', 
                target, synthesis, qc, release1, transport2
                from rk2aikataulu where id = '{request.Id}'";

                using (IDbConnection cnn = new SQLiteConnection(_configuration.GetConnectionString("DefaultConnection2"))) //"DefaultConnection1"
                {
                    cnn.Open();
                    //if (connection.)
                    var result = await cnn.QueryFirstOrDefaultAsync<AikatauluFromBackend>(queryString, new DynamicParameters());
                    
            
                    return Result<AikatauluFromBackend>.Success(result);
                } 
                
            }
        }
    }
}