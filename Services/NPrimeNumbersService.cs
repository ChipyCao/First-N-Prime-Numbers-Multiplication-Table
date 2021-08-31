using System.Collections.Generic;
using System.Linq;

namespace NPrimeNumbersMultiplicationTable.Services
{
    public class NPrimeNumbersService
    {
        public NPrimeNumbersService()
        {
        }

        // Recieves an 'n' parameter
        // Returns a list of the first 'n' prime numbers.
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

        // Recieves a number 'm' and a list ordered of prime numbers
        // Returns the modified list, now including the next 'm' aditional prime numbers
        public List<long> getRemainingPrimeNumbers(long m, List<long> items)
        {
            if (m == 0)
                return items;

            var nextPrimeNumber = FindNextPrimeNumber(items.LastOrDefault());
            items.Add(nextPrimeNumber);

            return getRemainingPrimeNumbers(m - 1, items);
        }

        // Recieves a number
        // Returns the next prime number after it
        public long FindNextPrimeNumber(long number)
        {
            number++;
            while (!CheckPrimeNumber(number))
            {
                number++;
            }
            return number;
        }

        // Recieves a number
        // Returns true if the number is prime, and false if its not
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
