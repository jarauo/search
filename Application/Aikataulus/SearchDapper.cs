using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SQLite;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Dapper;
using Domain;
using MediatR;
using Microsoft.Extensions.Configuration;

namespace Application.Aikataulus
{
    public class SearchDapper
    {
        public class Query : IRequest<Result<List<AikatauluFromBackend>>> {
            public DateTime Date1 {get; set;}
            public string Code {get; set;}
           
        }

        public class Handler : IRequestHandler<Query, Result<List<AikatauluFromBackend>>>
        {
            private readonly IConfiguration _configuration;
            
            public Handler(IConfiguration config)
            {
                _configuration = config;
            }

            public async Task<Result<List<AikatauluFromBackend>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string year = request.Date1.Year.ToString();
                string code = request.Code;

                var queryString = @$"Select id, date1, code, number, starttime, time(starttime, duration) as 'endtime', 
                target, synthesis, qc, release1, transport2
                from rk2aikataulu where date1 between '{year}-01-01' and '{year}-12-31' and code = '{code}' order by date1 asc";

                using (IDbConnection cnn = new SQLiteConnection(_configuration.GetConnectionString("DefaultConnection2"))) //"DefaultConnection1"
                {
                    cnn.Open();
                    //if (connection.)
                    var result = await cnn.QueryAsync<AikatauluFromBackend>(queryString, new DynamicParameters());
                    //return 
                    result.ToList();

                    //return Result<List<SynthesisBatch>>.Success( await _context.SynthesisBatch.ToListAsync(cancellationToken));
                   
                    return Result<List<AikatauluFromBackend>>.Success(result.ToList());
                } 
            }
        }
    }
}