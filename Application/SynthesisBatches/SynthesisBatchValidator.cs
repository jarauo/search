using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.SynthesisBatches
{
    public class SynthesisBatchValidator : AbstractValidator<SynthesisBatch>
    {
        public SynthesisBatchValidator()
        {
            RuleFor(x => x.BatchNumber).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.StartTime).NotEmpty();
            RuleFor(x => x.EndTime).NotEmpty();
            RuleFor(x => x.TargetryPerson).NotEmpty();
            RuleFor(x => x.SynthesisPerson).NotEmpty();
            RuleFor(x => x.QCPerson).NotEmpty();
            RuleFor(x => x.Releaser).NotEmpty();
            RuleFor(x => x.Cyclotron).NotEmpty();
        }
    }
}