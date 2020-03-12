import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redireciona para home caso ja esteja logado
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // pega a return url dos parametros da rota ou atribui '/' como padrao
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // getter para acessar mais facilmente os form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // para por aqui caso o form seja invalido
    if (this.loginForm.invalid) {
      return;
    }


    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.success) {
            this.router.navigate([this.returnUrl]);
          }
          else {
            this.error = data.error;
            this.loading = false;
            this.authenticationService.logout();
          }
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
