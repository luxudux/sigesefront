import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// interface
import { EstadoInterface } from './estado-interface';
// Configuration
import { environment } from '../../../environments/environment';
// Own Service HTTP
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  baseUrl: string;
  baseUrlyear: number;
  url: string;
  token: string;

  // public estados: any;
  // public estados: EstadoInterface[] = [
  //   { id: 1, name: 'No leído', icon: 'mail_outline', color_icon: 'grey-text text-darken-1' },
  //   { id: 2, name: 'Leído', icon: 'done', color_icon: 'grey-text text-darken-2' },
  //   { id: 3, name: 'Notificado', icon: 'done_all', color_icon: 'green-text text-darken-1' },
  // ];
  public estados: EstadoInterface[] = [];
  constructor(
    private httpService: HttpService,
  ) {
    this.baseUrl = environment.apiUrl;
    this.baseUrlyear = 2019;
    this.url = `${this.baseUrl}/${this.baseUrlyear}/states`;
    this.token = 'token';
  }

  setItems(data: EstadoInterface[]) {
    this.estados = data;
  }

  getItems(): Observable<Array<EstadoInterface>> {

    return this.httpService.get(this.url, this.token);
  }
  getItem(arrayValues: EstadoInterface): Promise<any> {

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
  addItem(arrayValues: EstadoInterface): Promise<any> {

    const params = {
      name: arrayValues.name,
      icon: arrayValues.icon,
      color_icon: arrayValues.color_icon
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
  updateItem(arrayValues: EstadoInterface): Promise<any> {

    const url = `${this.url}/${arrayValues.id}`;
    const params = {
      name: arrayValues.name,
      icon: arrayValues.icon,
      color_icon: arrayValues.color_icon
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
  deleteItem(arrayValues: EstadoInterface): Promise<any> {

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
