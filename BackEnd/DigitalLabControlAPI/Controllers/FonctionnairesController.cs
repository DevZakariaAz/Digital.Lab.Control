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

            // Seed initial data only if empty
            if (!_context.Fonctionnaires.Any())
            {
                if (!_context.Documents.Any())
                {
                    _context.Documents.AddRange(new List<Document>
                    {
                        new Document { FileName = "Document A", DateImported = DateTime.UtcNow },
                        new Document { FileName = "Document B", DateImported = DateTime.UtcNow }
                    });
                    _context.SaveChanges();
                }

                _context.Fonctionnaires.AddRange(new List<Fonctionnaire>
                {
                    new Fonctionnaire
                    {
                        Nom = "El Mansouri", Prenom = "Amina", Grade = "Assistante RH",
                        DateRecrutement = new DateTime(2019, 3, 15), DocumentId = _context.Documents.First().Id
                    },
                    new Fonctionnaire
                    {
                        Nom = "Benali", Prenom = "Youssef", Grade = "Technicien",
                        DateRecrutement = new DateTime(2018, 7, 20), DocumentId = _context.Documents.Skip(1).First().Id
                    }
                });
                _context.SaveChanges();
            }
        }

        // GET: api/fonctionnaires
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Fonctionnaire>>> GetAll()
        {
            try
            {
                var fonctionnaires = await _context.Fonctionnaires.Include(f => f.Document).ToListAsync();
                return Ok(fonctionnaires);
            }
            catch (Exception ex)
            {
                // Log ex.Message somewhere or inspect here during debugging
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // GET: api/fonctionnaires/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Fonctionnaire>> GetById(int id)
        {
            var fonctionnaire = await _context.Fonctionnaires
                .Include(f => f.Document)
                .FirstOrDefaultAsync(f => f.Id == id);

            if (fonctionnaire == null) return NotFound();
            return fonctionnaire;
        }

        // POST: api/fonctionnaires
        [HttpPost]
        public async Task<ActionResult<Fonctionnaire>> Create(Fonctionnaire fonctionnaire)
        {
            if (!await _context.Documents.AnyAsync(d => d.Id == fonctionnaire.DocumentId))
                return BadRequest($"Document with Id {fonctionnaire.DocumentId} does not exist.");

            _context.Fonctionnaires.Add(fonctionnaire);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = fonctionnaire.Id }, fonctionnaire);
        }

        // PUT: api/fonctionnaires/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Fonctionnaire fonctionnaire)
        {
            if (id != fonctionnaire.Id) return BadRequest();

            if (!await _context.Documents.AnyAsync(d => d.Id == fonctionnaire.DocumentId))
                return BadRequest($"Document with Id {fonctionnaire.DocumentId} does not exist.");

            _context.Entry(fonctionnaire).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.Fonctionnaires.AnyAsync(f => f.Id == id)) return NotFound();
                throw;
            }

            return NoContent();
        }

        [HttpPost("bulk")]
        public async Task<IActionResult> CreateBulk([FromBody] List<Fonctionnaire> fonctionnaires)
        {
            if (fonctionnaires == null || !fonctionnaires.Any())
                return BadRequest("No fonctionnaires provided.");

            foreach (var f in fonctionnaires)
            {
                if (f.DocumentId == 0)
                    f.DocumentId = 1; // default document ID

                // Exemple simple de validation minimale
                if (string.IsNullOrWhiteSpace(f.Nom) || string.IsNullOrWhiteSpace(f.Prenom) || string.IsNullOrWhiteSpace(f.Grade))
                {
                    return BadRequest("Chaque fonctionnaire doit avoir un nom, prénom et grade valides.");
                }
            }

            try
            {
                _context.Fonctionnaires.AddRange(fonctionnaires);
                await _context.SaveChangesAsync();
                return Ok(fonctionnaires);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Erreur serveur lors de l'ajout en bulk : " + ex.Message);
            }
        }

        // DELETE: api/fonctionnaires/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var fonctionnaire = await _context.Fonctionnaires.FindAsync(id);
            if (fonctionnaire == null) return NotFound();

            _context.Fonctionnaires.Remove(fonctionnaire);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
