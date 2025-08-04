using DigitalLabControlAPI.Data;
using DigitalLabControlAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DigitalLabControlAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FonctionnairesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FonctionnairesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Fonctionnaire>>> GetFonctionnaires()
        {
            return await _context.Fonctionnaires.Include(f => f.Document).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Fonctionnaire>> PostFonctionnaire(Fonctionnaire fonctionnaire)
        {
            _context.Fonctionnaires.Add(fonctionnaire);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetFonctionnaires), new { id = fonctionnaire.Id }, fonctionnaire);
        }
    }
}
