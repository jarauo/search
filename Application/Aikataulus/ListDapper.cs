using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Domain;
using Dapper;
using System.Threading;
using Microsoft.EntityFrameworkCore;
using Application.Core;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SQLite;
using System.Globalization;

namespace Application.Aikataulus
{
    public class ListDapper
    {
        public class Query : IRequest<Result<List<AikatauluFromBackend>>> {
            public int WeekNumber {get; set;}
           
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
            
                DateTime monday = FirstDateOfWeekISO8601(2021,request.WeekNumber);
                string friday = monday.AddDays(4).ToString("yyyy-MM-dd");
                string mondayString = monday.ToString("yyyy-MM-dd");
                Console.WriteLine("Monday: "+mondayString);
                Console.WriteLine("Friday: "+friday);
                //string haku = "'FHA'";

                var queryString = @$"Select id, date1, code, number, starttime, time(starttime, duration) as 'endtime', 
                target, synthesis, qc, release1, transport2
                from rk2aikataulu where date1 between '{mondayString}' and '{friday}' order by date1 asc";

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

            public static DateTime FirstDateOfWeekISO8601(int year, int weekOfYear)
            {
                DateTime jan1 = new DateTime(year, 1, 1);
                int daysOffset = DayOfWeek.Thursday - jan1.DayOfWeek;

                // Use first Thursday in January to get first week of the year as
                // it will never be in Week 52/53
                DateTime firstThursday = jan1.AddDays(daysOffset);
                var cal = CultureInfo.CurrentCulture.Calendar;
                int firstWeek = cal.GetWeekOfYear(firstThursday, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);

                var weekNum = weekOfYear;
                // As we're adding days to a date in Week 1,
                // we need to subtract 1 in order to get the right date for week #1
                if (firstWeek == 1)
                {
                    weekNum -= 1;
                }

                // Using the first Thursday as starting week ensures that we are starting in the right year
                // then we add number of weeks multiplied with days
                var result = firstThursday.AddDays(weekNum * 7);

                // Subtract 3 days from Thursday to get Monday, which is the first weekday in ISO8601
                return result.AddDays(-3);
            }  
        }
    }
}