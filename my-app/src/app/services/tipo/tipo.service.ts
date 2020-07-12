import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// interface
import { TipoInterface } from './tipo-interface';
// Configuration
import { environment } from '../../../environments/environment';
// Own Service HTTP
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  baseUrl: string;
  baseUrlyear: number;
  url: string;
  token: string;

  public tipos: TipoInterface[] = [];
  constructor(
    private httpService: HttpService,
  ) {
    this.baseUrl = environment.apiUrl;
    this.baseUrlyear = 2019;
    this.url = `${this.baseUrl}/${this.baseUrlyear}/types`;
    this.token = 'token';
  }

  setItems(data: TipoInterface[]) {
    this.tipos = data;
  }

  getItems(): Observable<Array<TipoInterface>> {
    // Regresa un observable
    return this.httpService.get(this.url, this.token);
  }
  getItem(arrayValues: TipoInterface): Promise<any> {
    // console.log('Get Item');
    const url = `${this.url}/${arrayValues.id}`;
    // El observador lo convertimos a promesa
    return this.httpService.get(url, this.token)
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return false;
      });
  }
  addItem(arrayValues: TipoInterface): Promise<any> {

    const params = { name: arrayValues.name, code: arrayValues.code };
    // El observador lo convertimos a promesa
    return this.httpService.post(this.url, params, this.token)
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return false;
      });
  }
  updateItem(arrayValues: TipoInterface): Promise<any> {
    const url = `${this.url}/${arrayValues.id}`;
    const params = { name: arrayValues.name, code: arrayValues.code };
    // El observador lo convertimos a promesa
    return this.httpService.put(url, params, this.token)
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return false;
      });
  }
  deleteItem(arrayValues: TipoInterface): Promise<any> {

    const url = `${this.url}/${arrayValues.id}`;
    // El observador lo convertimos a promesa
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
