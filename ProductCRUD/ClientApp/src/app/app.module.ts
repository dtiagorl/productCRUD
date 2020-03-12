import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';

import { ProdutosComponent } from './produtos/produtos.component';
import { ProdutoComponent } from './produtos/produto/produto.component';
import { ProdutoListaComponent } from './produtos/produto-lista/produto-lista.component';
import { ProdutoService } from './shared/produto.service';

import { LoginComponent } from './login';
import { ErrorInterceptor, BasicAuthInterceptor } from './helpers';

@NgModule({
  declarations: [
    AppComponent,
    ProdutosComponent,
    ProdutoComponent,
    ProdutoListaComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    appRoutingModule,
  ],
  providers: [
    ProdutoService,
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
