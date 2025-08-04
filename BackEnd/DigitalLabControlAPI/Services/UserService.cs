using DigitalLabControlAPI.Models;

namespace DigitalLabControlAPI.Services
{
    public interface IUserService
    {
        User? Authenticate( string email, string password);
    }

    public class UserService : IUserService
    {
        private List<User> _users = new()
    {
        new User { Id = 1, Username = "ZakariaAz" , Email = "zakaria@gmail.com", Password = "zakaria" },
    };

        public User? Authenticate(string email, string password)
        {
            return _users.FirstOrDefault(u => u.Email == email && u.Password == password);
        }
    }
}
