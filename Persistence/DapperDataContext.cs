using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.EntityFrameworkCore;
using Dapper;

namespace Persistence
{
    public class DapperDataContext : DbContext
    {
        public DapperDataContext(DbContextOptions options) : base(options) 
        {

        }
        public DbSet<SynthesisBatch> SynthesisBatch {get; set;}
    }
}