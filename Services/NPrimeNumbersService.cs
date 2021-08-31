using System.Collections.Generic;
using System.Linq;

namespace NPrimeNumbersMultiplicationTable.Services
{
    public class NPrimeNumbersService
    {
        public NPrimeNumbersService()
        {
        }
        public IEnumerable<long> GetFirstNPrimeNumbers(long n)

        {
            var items = new List<long>();
            if (n <= 0)

                return items;
            if (n >= 1)
            {
                items.Add(2);
                n--;
            }
            if (n >= 2)
            {
                items.Add(3);
                n--;
            }
            if (n >= 3)
            {
                items.Add(5);
                n--;
            }
            var result = getRemainingPrimeNumbers(n, items);
            return result;
        }

        public List<long> getRemainingPrimeNumbers(long countLeft, List<long> items)
        {

            if (countLeft == 0)
                return items;

            var nextPrimeNumber = FindNextPrimeNumber(items.LastOrDefault());
            items.Add(nextPrimeNumber);

            return getRemainingPrimeNumbers(countLeft - 1, items);
        }

        public long FindNextPrimeNumber(long number)
        {
            number++;
            while (!CheckPrimeNumber(number))
            {
                number++;
            }
            return number;
        }

        public bool CheckPrimeNumber(long number)
        {
            for (long i = 2; i < number / 2; i++)
            {
                if (number % i == 0)
                {
                    return false;
                }
            }
            return true;
        }
    }
}
