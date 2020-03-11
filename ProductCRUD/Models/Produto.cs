using System;
using System.Collections.Generic;

namespace ProductCRUD.Models
{
    public partial class Produto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string ValorVenda { get; set; }
        public string Imagem { get; set; }
    }
}
