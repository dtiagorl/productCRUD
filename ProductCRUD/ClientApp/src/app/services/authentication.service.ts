import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`https://dev.sitemercado.com.br/api/login`, { username, password }, {
      headers: {
        Authorization: `Basic ${window.btoa(username + ':' + password)}`
      }
    }).pipe(map(user => {
        // armazena detalhes do usuario e credenciais basicas de autenticação para manter o usuario logado entre atualizações de página
        user.authdata = window.btoa(username + ':' + password);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);


        return user;
    }))
  }

  logout() {
    // remove o usuario do armazenamento local e efetua logout
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
