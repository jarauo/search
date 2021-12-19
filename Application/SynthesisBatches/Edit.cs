using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.SynthesisBatches
{
    public class Edit
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
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                //Get a synthesisBatch from database
                var synthesisbatch = await _context.SynthesisBatch.FindAsync(request.SynthesisBatch.Id);

                if (synthesisbatch == null) return null;

                _mapper.Map(request.SynthesisBatch, synthesisbatch);

                //Save changes to database
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update SynthesisBatch");

                //Return nothing
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}