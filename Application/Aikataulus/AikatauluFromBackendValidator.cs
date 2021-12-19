using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Aikataulus
{
    public class AikatauluFromBackendValidator : AbstractValidator<AikatauluFromBackend>
    {
        public AikatauluFromBackendValidator()
        {
            //RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Date1).NotEmpty();
            RuleFor(x => x.Starttime).NotEmpty();
            RuleFor(x => x.Endtime).NotEmpty();
            RuleFor(x => x.Duration).NotEmpty();
            RuleFor(x => x.Code).NotEmpty();
            RuleFor(x => x.Target).NotEmpty();
            RuleFor(x => x.Synthesis).NotEmpty();
            RuleFor(x => x.Qc).NotEmpty();
            RuleFor(x => x.Release1).NotEmpty();
            RuleFor(x => x.Transport2).NotEmpty();
        }
    }
}