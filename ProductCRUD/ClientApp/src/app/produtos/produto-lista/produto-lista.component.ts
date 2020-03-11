import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../shared/produto.service';
import { Produto } from '../../shared/produto.model';

@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  styles: []
})

export class ProdutoListaComponent implements OnInit {

  constructor(private service: ProdutoService) {

  }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(prod: Produto) {
    this.service.formData = Object.assign({}, prod);
  }

  onDelete(Id) {
    if (confirm("Deseja excluir o produto ?")) {
      this.service.deleteProduto(Id)
        .subscribe(res => {
          this.service.refreshList();
        },
          err => {
            console.log(err);
          })
    }
  }
}
