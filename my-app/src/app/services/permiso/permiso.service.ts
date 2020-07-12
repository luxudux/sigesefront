import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
import { Observable } from 'rxjs';
// interface
import { PermisoInterface } from './permiso-interface';
// Configuration
import { environment } from '../../../environments/environment';
// Own Service HTTP
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {

  baseUrl: string;
  baseUrlyear: number;
  url: string;
  token: string;

  // private permisos: PermisoInterface[] = [
  //   {id: 1, name: 'Dependencia con permiso 1'},
  //   {id: 2, name: 'Dependencia con permiso 2'},
  //   {id: 3, name: 'Dependencia con permiso 3'},
  // ];
  public permisos: PermisoInterface[];
  constructor(
    private httpService: HttpService,
  ) {
    this.baseUrl = environment.apiUrl;
    this.baseUrlyear = 2019;
    this.url = `${this.baseUrl}/${this.baseUrlyear}/offices_users`;
    this.token = 'token';
  }

  setItems(data: PermisoInterface[]) {
    this.permisos = data;
  }

  getItems(): Observable<Array<PermisoInterface>> {

    return this.httpService.get(this.url, this.token);
  }
  getItem(arrayValues: PermisoInterface): Promise<any> {

    const url = `${this.url}/${arrayValues.id}`;
    return this.httpService.get(url, this.token)
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return false;
      });
  }
  addItem(arrayValues: PermisoInterface): Promise<any> {

    const params = {
      office_id: arrayValues.office_id,
      user_id: arrayValues.user_id,
    };
    return this.httpService.post(this.url, params, this.token)
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return false;
      });
  }
  updateItem(arrayValues: PermisoInterface): Promise<any> {

    const url = `${this.url}/${arrayValues.id}`;
    const params = {
      office_id: arrayValues.office_id,
      user_id: arrayValues.user_id,
    };
    return this.httpService.put(url, params, this.token)
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        // console.log('error ' + error);
        return false;
      });
  }
  deleteItem(arrayValues: PermisoInterface): Promise<any> {

    const url = `${this.url}/${arrayValues.id}`;
    return this.httpService.delete(url, this.token)
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return false;
      });
  }
}
