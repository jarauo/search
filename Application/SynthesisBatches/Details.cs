using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.SynthesisBatches
{
    public class Details
    {
        public class Query : IRequest<Result<SynthesisBatch>>
        {
            public Guid Id { get; set; }    //vain tämä jos haluaa id:n perusteella

        }

        public class Handler : IRequestHandler<Query, Result<SynthesisBatch>>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Result<SynthesisBatch>> Handle(Query request, CancellationToken cancellationToken)
            {
                //throw new NotImplementedException();
                //return await _context.SynthesisBatch.FindAsync(request.Id);
                var synthesisbatch = await _context.SynthesisBatch.FindAsync(request.Id);
                return Result<SynthesisBatch>.Success(synthesisbatch);
            }
        }
    }
}