using System;
using System.Text.Json.Serialization;

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
        [JsonIgnore]
        public Document Document { get; set; }
    }
}
