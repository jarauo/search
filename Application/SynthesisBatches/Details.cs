using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.SynthesisBatches
{
    public class Details
    {
        public class Query : IRequest<SynthesisBatch>
        {
            public Guid Id { get; set; }    //vain tämä jos haluaa id:n perusteella

        }

        public class Handler : IRequestHandler<Query, SynthesisBatch>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<SynthesisBatch> Handle(Query request, CancellationToken cancellationToken)
            {
                //throw new NotImplementedException();
                return await _context.SynthesisBatch.FindAsync(request.Id);
            }
        }
    }
}