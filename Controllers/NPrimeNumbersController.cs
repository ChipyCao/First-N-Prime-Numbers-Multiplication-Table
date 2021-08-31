using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NPrimeNumbersMultiplicationTable.Services;
using System.Collections.Generic;

namespace NPrimeNumbersMultiplicationTable.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NPrimeNumbersController : ControllerBase
    {

        private readonly ILogger<NPrimeNumbersController> _logger;
        private NPrimeNumbersService _nPrimeNumbersService;

        public NPrimeNumbersController(ILogger<NPrimeNumbersController> logger)
        {
            _logger = logger;
            _nPrimeNumbersService = new NPrimeNumbersService();
        }

        [HttpGet]
        public IEnumerable<long> GetFirstNPrimeNumbers(long n)
        {

            var result = _nPrimeNumbersService.GetFirstNPrimeNumbers(n);
            return result;
        }
    }
}
