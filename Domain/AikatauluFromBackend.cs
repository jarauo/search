using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class AikatauluFromBackend
    {
        public int Id { get; set; } 
        public DateTime Date1 { get; set;} 
        public DateTime Starttime { get; set; }
        public DateTime Endtime { get; set; }
        public DateTime Duration { get; set; }
        public string Code { get; set; }  
        public string Target { get; set; } 
        public string Synthesis { get; set; } 
        public string Qc { get; set; } 
        public string Release1 { get; set; } 
        public string Transport2 { get; set; }
    
    }
}