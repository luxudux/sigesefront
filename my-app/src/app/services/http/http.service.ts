import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// HTTP
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// SESSION
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  cabeceras: HttpHeaders;
  parametros: HttpParams;
  // Variables cabeceras
  public userId = '5';
  public officeId = '5';
  public xApiKey = 'ljlkj';

  constructor(
    private http: HttpClient,
    private localSt: LocalStorageService,
  ) { }
  // GET
  public get(url, token): Observable<any> {
    this.cabeceras = new HttpHeaders({
      'Content-Type': 'application/json',
      'user-id': this.userId,
      'office-id': this.officeId,
      'x-api-key': token,
    });
    const options = {
      headers: this.cabeceras,
    };
    return this.http.get(url, options);
  }
  // PUT
  public put(url, params, token): Observable<any> {
    this.cabeceras = new HttpHeaders({
      'Content-Type': 'application/json',
      'user-id': this.userId,
      'office-id': this.officeId,
      'x-api-key': token
    });
    this.parametros = new HttpParams({

    });
    const options = {
      headers: this.cabeceras,
      params: this.parametros
    };
    // Convertir objeto a json
    const body = JSON.stringify(params);
    return this.http.put(url, body, options);
  }
  // PATCH
  public patch(url, params, token): Observable<any> {
    this.cabeceras = new HttpHeaders({
      'Content-Type': 'application/json',
      'user-id': this.userId,
      'office-id': this.officeId,
      'x-api-key': token
    });
    this.parametros = new HttpParams({

    });
    const options = {
      headers: this.cabeceras,
      params: this.parametros
    };
    // Convertir objeto a json
    const body = JSON.stringify(params);
    return this.http.patch(url, body, options);
  }
  // POST
  public post(url, params, token?): Observable<any> {
    // If not token is becouse is login post
    // !!expr returns a Boolean value (true or false)
    this.cabeceras = !!token ? new HttpHeaders({
      'Content-Type': 'application/json',
      'user-id': this.userId,
      'office-id': this.officeId,
      'x-api-key': token
    }) : new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.parametros = new HttpParams({

    });
    const options = {
      headers: this.cabeceras,
      params: this.parametros
    };
    // Convertir objeto a json
    const body = JSON.stringify(params);
    return this.http.post(url, body, options);
  }
  // DELETE
  public delete(url, token): Observable<any> {
    this.cabeceras = new HttpHeaders({
      'Content-Type': 'application/json',
      'user-id': this.userId,
      'office-id': this.officeId,
      'x-api-key': token
    });
    this.parametros = new HttpParams({

    });
    const options = {
      headers: this.cabeceras,
      params: this.parametros
    };
    return this.http.delete(url, options);
  }
}
