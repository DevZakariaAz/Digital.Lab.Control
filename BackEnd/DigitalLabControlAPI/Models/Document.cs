using System;
using System.Collections.Generic;

namespace DigitalLabControlAPI.Models
{
    public class Document
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public DateTime DateImported { get; set; }

        public ICollection<Fonctionnaire> Fonctionnaires { get; set; }
    }
}
