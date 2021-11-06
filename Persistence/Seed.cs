using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.SynthesisBatch.Any()) return;

            var synthesisbatch = new List<SynthesisBatch> 
            {
                new SynthesisBatch
                {
                    BatchNumber = "21FPE001PT",
                    Date = "12-1-2021",
                    StartTime = "9:50",
                    EndTime = "10:22",
                    TargetryPerson = "JFR",
                    SynthesisPerson = "JU",
                    QCPerson = "JES",
                    Releaser = "AKK",
                    Cyclotron = "TR-18",
                },
                new SynthesisBatch
                {
                    BatchNumber = "21FHA001PT",
                    Date = "22-5-2021",
                    StartTime = "10:30",
                    EndTime = "11:00",
                    TargetryPerson = "JFR",
                    SynthesisPerson = "JU",
                    QCPerson = "JES",
                    Releaser = "AKK",
                    Cyclotron = "TR-18",
                }
            };
            await context.SynthesisBatch.AddRangeAsync(synthesisbatch);
            await context.SaveChangesAsync();
        }
    }
}