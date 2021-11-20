using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class SynthesisBatch
    {
        public Guid Id { get; set; }
        public String BatchNumber { get; set; }
        public DateTime Date { get; set; }
        public String StartTime { get; set; }
        public String EndTime { get; set; }
        public String TargetryPerson { get; set; }
        public String SynthesisPerson { get; set; }
        public String QCPerson { get; set; }
        public String Releaser { get; set; }
        public String Cyclotron { get; set; }

    }
}