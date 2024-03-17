using System;

class Program
{
    static void Main(string[] args)
    {
        int[] array = new int[] { 1, 2, 3 };

        // Call the Selection Sort function
        // worst case n(n-1)/2 => (n^2 - n)/2
        // best case n(n-1)/2 => (n^2 - n)/2
        //SelectionSort(array);

        // Call the Insertion Sort function
        // worst case n(n-1)/2 => (n^2 - n)/2
        // best case O(n-1)
        InsertionSort(array);

        // Print sorted array
        foreach (int element in array)
        {
            Console.WriteLine(element);
        }
    }

    // Selection Sort function
    public static void SelectionSort(int[] array)
    {
        for (int current = 0; current < array.Length - 1; current++)
        {
            int minIndex = current;

            for (int i = current + 1; i < array.Length; i++)
            {
                Console.WriteLine("compare");
                if (array[i] < array[minIndex])
                {
                    minIndex = i;
                }
            }
            Console.WriteLine("swap");
            (array[current], array[minIndex]) = (array[minIndex], array[current]);
        }
    }

    // Insertion Sort function
    public static void InsertionSort(int[] array)
    {
        int i;
        for (int current = 1; current < array.Length - 1; current++)
        {
            i = current;
            Console.WriteLine("compare");
            while (i > 0 && array[i - 1] > array[i])
            {
                Console.WriteLine("swap");
                (array[i - 1], array[i]) = (array[i], array[i - 1]);
                i--;
            }
        }
    }
}
