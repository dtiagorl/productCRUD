import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../shared/produto.service';
import { NgForm } from '@angular/forms';

import * as _ from 'lodash';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styles: []
})
export class ProdutoComponent implements OnInit {

  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;

  constructor(private service: ProdutoService) {

  }

  ngOnInit() {
    this.resetForm();
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Filtro de Tamanho em Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Tamanho máximo permitido é de ' + max_size / 1000 + 'Mb';

        return false;
      }

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.imageError = 'Somente imagens ( JPG | PNG ) são permitidas';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);


          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Dimensões máximas permitidas ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();

    this.service.formData = {
      Id: 0,
      Nome: '',
      ValorVenda: '',
      Imagem: ''
    }
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.Id == 0) {
      this.service.formData.Imagem = this.cardImageBase64;
      this.insertRecord(form);

    }
    else
    {
      this.service.formData.Imagem = this.cardImageBase64;
      this.updateRecord(form);
    
    }
  }

  insertRecord(form: NgForm) {
    this.service.postProduto().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.removeImage();
      },
      err => {
        console.log(err);
      }
    )
  }

  updateRecord(form: NgForm) {
    this.service.putProduto().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.removeImage();
      },
      err => {
        console.log(err);
      }
    )
  }
}
