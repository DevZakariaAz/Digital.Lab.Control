using DigitalLabControlAPI.Models;

namespace DigitalLabControlAPI.Services
{
    public interface IUserService
    {
        User? Authenticate(string username, string password);
    }

    public class UserService : IUserService
    {
        private List<User> _users = new()
    {
        new User { Id = 1, email = "zakaria@gmail.com", Password = "zakaria" },
    };

        public User? Authenticate(string username, string password)
        {
            return _users.FirstOrDefault(u => u.email == username && u.Password == password);
        }
    }
}
