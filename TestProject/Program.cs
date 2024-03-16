using System;

class Program
{
    static void Main(string[] args)
    {
        // Initialize the array to be sorted
        int[] array = new int[] {3,2,1};

        // Selection sort algorithm
        for (int current = 0; current < array.Length - 1; current++)
        {
            
            // Assume the current element is the minimum
            int minIndex = current;

            // Find the index of the minimum element in the unsorted portion of the array
            for (int i = current + 1; i < array.Length; i++)
            {
                // Comparisons: n(n-1)/2 => (n^2 - n)/2
                // Check if the current element is less than the assumed minimum
                Console.WriteLine("compare");
                if (array[i] < array[minIndex])
                {
                    // Update the index of the minimum element
                    minIndex = i;
                }
            }

            // Swap the current element with the minimum element: n - 1
            // Using tuple deconstruction 
            Console.WriteLine("swap");
            (array[current], array[minIndex]) = (array[minIndex], array[current]);
        }

        // Print sorted array
        foreach (int element in array)
        {
            Console.WriteLine(element);
        }
    }
}
