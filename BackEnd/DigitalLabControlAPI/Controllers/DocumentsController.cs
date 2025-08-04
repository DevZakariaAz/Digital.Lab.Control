using DigitalLabControlAPI.Data;
using DigitalLabControlAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace DigitalLabControlAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]

    public class DocumentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DocumentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Document>>> GetDocuments()
        {
            return await _context.Documents.Include(d => d.Fonctionnaires).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Document>> PostDocument(Document document)
        {
            _context.Documents.Add(document);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetDocuments), new { id = document.Id }, document);
        }
    }
}
