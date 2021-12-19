using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.SynthesisBatches
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public SynthesisBatch SynthesisBatch { get; set; }
        }


        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.SynthesisBatch).SetValidator(new SynthesisBatchValidator());
            }
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
                //Save SynthesisBatch to memory
                _context.SynthesisBatch.Add(request.SynthesisBatch);

                //Save to database async if changes are more than 0 returns true else false
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create SynthesisBatch");

                //Return nothing
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}