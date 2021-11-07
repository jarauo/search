using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.SynthesisBatches
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                var synthesisbatch = await _context.SynthesisBatch.FindAsync(request.Id);

                //Remove from memory
                _context.Remove(synthesisbatch);

                //Save changes to database (remove from database)
                await _context.SaveChangesAsync();

                //return nothing
                return Unit.Value;
            }
        }
    }
}