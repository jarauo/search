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
    public class Create
    {
        public class Command : IRequest
        {
            public SynthesisBatch SynthesisBatch { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                //Save SynthesisBatch to memory
                _context.SynthesisBatch.Add(request.SynthesisBatch);

                //Save to database async
                await _context.SaveChangesAsync();

                //Return nothing
                return Unit.Value;
            }
        }
    }
}