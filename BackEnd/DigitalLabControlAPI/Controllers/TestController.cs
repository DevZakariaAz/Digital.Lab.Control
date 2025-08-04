using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DigitalLabControlAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        [HttpGet("public")]
        public IActionResult Public() => Ok("Route publique accessible sans token");

        [Authorize]
        [HttpGet("private")]
        public IActionResult Private() => Ok("Route privée accessible seulement avec token JWT valide");
    }
}
