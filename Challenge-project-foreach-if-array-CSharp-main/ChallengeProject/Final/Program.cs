using System;

class Program
{
    static void Main(string[] args)
    {
        int[] array = new int[] { 3, 2, 1 };

        // Call the Selection Sort function
        SelectionSort(array);

        // Call the Insertion Sort function
        // InsertionSort(array);

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
        for (int current = 1; current < array.Length; current++)
        {
            i = current;
            while (i > 0 && array[i - 1] > array[i])
            {
                Console.WriteLine("compare/swap");
                (array[i - 1], array[i]) = (array[i], array[i - 1]);
                i--;
            }
        }
    }
}
