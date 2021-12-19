using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.SynthesisBatches
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var synthesisbatch = await _context.SynthesisBatch.FindAsync(request.Id);

                //if (synthesisbatch == null) return null;

                //Remove from memory
                _context.Remove(synthesisbatch);

                //Save changes to database (remove from database)
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete the SynthesisBatch");

                //return nothing
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}