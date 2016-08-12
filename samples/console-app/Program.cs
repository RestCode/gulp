using System;
using WebApi.Proxies.Clients;

namespace ConsoleApplication
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");

            DoStuff();

            Console.ReadKey();
        }

        private static async void DoStuff(){
            var client = new ValuesClient();
            var response = await client.GetAsync();
            var content = await response.Content.ReadAsStringAsync();

            Console.WriteLine(content);
        }
    }
}
