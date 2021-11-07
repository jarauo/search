using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.SynthesisBatches
{
    public class Edit
    {
        public class Command : IRequest
        {
            public SynthesisBatch SynthesisBatch { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                //Get a synthesisBatch from database
                var synthesisbatch = await _context.SynthesisBatch.FindAsync(request.SynthesisBatch.Id);

                _mapper.Map(request.SynthesisBatch, synthesisbatch);

                //Save changes to database
                await _context.SaveChangesAsync();

                //Return nothing
                return Unit.Value;
            }
        }
    }
}