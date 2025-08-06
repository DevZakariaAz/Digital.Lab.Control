using System;
using System.Collections.Generic;

namespace DigitalLabControlAPI.Models
{
    public class Document
    {
        public int Id { get; set; }

        public string FileName { get; set; } = string.Empty; // Avoid nulls

        public DateTime DateImported { get; set; }

        // Initialize collection to avoid null reference exceptions
        public ICollection<Fonctionnaire> Fonctionnaires { get; set; } = new List<Fonctionnaire>();
    }
}
