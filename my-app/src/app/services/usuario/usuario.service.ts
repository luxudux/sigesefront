import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// interface
import { UsuarioInterface } from './usuario-interface';
// Configuration
import { environment } from '../../../environments/environment';
// Own Service HTTP
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl: string;
  baseUrlyear: number;
  url: string;
  token: string;

  public usuarios: UsuarioInterface[];
  constructor(
    private httpService: HttpService,
  ) {
    this.baseUrl = environment.apiUrl;
    this.baseUrlyear = 2019;
    this.url = `${this.baseUrl}/${this.baseUrlyear}/users`;
    this.token = 'token';
  }

  setItems(data: UsuarioInterface[]) {
    this.usuarios = data;
  }

  getItems(): Observable<Array<UsuarioInterface>> {

    return this.httpService.get(this.url, this.token);
  }
  getItem(arrayValues: UsuarioInterface): Promise<any> {

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
  addItem(arrayValues: UsuarioInterface): Promise<any> {

    const params = {
      name: arrayValues.name,
      password: arrayValues.password,
      active: arrayValues.active,
      level_id: arrayValues.level_id,
      worker_id: arrayValues.worker_id,
      office_id: arrayValues.office_id,
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
  updateItem(arrayValues: UsuarioInterface): Promise<any> {

    const url = `${this.url}/${arrayValues.id}`;
    const params = {
      name: arrayValues.name,
      password: arrayValues.password,
      active: arrayValues.active,
      level_id: arrayValues.level_id,
      worker_id: arrayValues.worker_id,
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
  deleteItem(arrayValues: UsuarioInterface): Promise<any> {

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
