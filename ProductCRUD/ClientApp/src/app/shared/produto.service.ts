import { Injectable } from '@angular/core';
import { Produto } from './produto.model';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  formData: Produto;

  readonly rootURL = 'https://localhost:44388/api';
  list: Produto[];

  constructor(private http: HttpClient) {

  }

  postProduto() {
    return this.http.post(this.rootURL + '/Produto', this.formData);
  }

  putProduto() {
    return this.http.put(this.rootURL + '/Produto/' + this.formData.Id, this.formData);
  }

  deleteProduto(id) {
    return this.http.delete(this.rootURL + '/Produto/' + id);
  }

  refreshList() {
    this.http.get(this.rootURL + '/Produto')
      .toPromise()
      .then(res => this.list = res as Produto[]);
  }
}
