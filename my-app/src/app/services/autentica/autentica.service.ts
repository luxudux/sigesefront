import { Injectable } from '@angular/core';
// interface
import { UsuarioInterface } from '../usuario/usuario-interface';
import { AutenticaInterface } from '../autentica/autentica-interface';
// Configuration
import { environment } from '../../../environments/environment';
// Own Service HTTP
import { HttpService } from '../http/http.service';
// SESSION
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AutenticaService {

  baseUrl: string;
  baseUrlyear: number;
  url: string;
  token: string;
  // Datos a almacenar
  user;
  stateSession: boolean;

  constructor(
    private storage: LocalStorageService,
    private httpService: HttpService,
  ) {
    this.baseUrl = environment.apiUrl;
    this.baseUrlyear = 2019;
    this.url = `${this.baseUrl}/${this.baseUrlyear}/users/login`;
    console.log(this.url);
    this.stateSession = false;
  }

  // Saber si esta logeado
  public isLoggedIn() {
    // Consultamos user en memoria
    const user = this.storage.retrieve('user');
    if (!!user) {
      this.user = user;
      this.stateSession = true;
    }
    return this.stateSession;
  }

  // Login
  public logIn(username: string, clave: string): Promise<any> {

    const params = { name: username, password: clave };
    console.log(params);
    // El observador lo convertimos a promesa
    return this.httpService.post(this.url, params)
      .toPromise()
      .then((response) => {
        // console.log('Bueno todo ' + response);
        return response;
      })
      .catch((error) => {
        // console.log('error ' + error);
        return false;
      });
  }

  // Log out
  public logOut() {
    this.user = null;
    this.stateSession = false;
    this.storage.clear('user');
    // this.storage.store('token', this.attribute);
  }

}
