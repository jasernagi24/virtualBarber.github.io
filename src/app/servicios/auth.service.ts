import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UsuarioModel } from '../modelos/usuario.model';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //usuario nuevo 
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyApZBJP5iujr22E1TRisqPg446q-fwJjl4';
  userToken: string;

  constructor(private http: HttpClient) {
    this.getToken();
  }

  crearUsuario(usuario: UsuarioModel) {

    const authData = {
      nombre: usuario.nombre,
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true,
    };



    return this.http.post(
      `${this.url}signUp?key=${this.apiKey}`, authData).pipe(
        map(resp => {
          this.guardarToken(resp['idToken']);
          return resp;
        })
      )


  };

  login(usuario: UsuarioModel) {

    const authData = {
      nombre: usuario.nombre,
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true,
    };

    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apiKey}`, authData).pipe(
        map(resp => {
          this.guardarToken(resp['idToken']);
          return resp;
        })
      )


  };

  cerrarSesion() {
    localStorage.removeItem('Token')
    localStorage.removeItem('expira')
  }

  autenticado(): Boolean {

    if (this.userToken.length < 2) {
      return false;
    }
    const expira = localStorage.getItem('expira');
    const expirafecha = new Date(expira);
    if (expirafecha > new Date()) {
      return true;
    }

  }


  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('Token', idToken);
    let hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem('expira', hoy.toString());
  }

  private getToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token')
    }
    else {
      this.userToken = ''
    }
  }
}
