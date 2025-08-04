using System;

namespace DigitalLabControlAPI.Models
{
    public class Fonctionnaire
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string Grade { get; set; }
        public DateTime DateRecrutement { get; set; }

        public int DocumentId { get; set; }
        public Document Document { get; set; }
    }
}
