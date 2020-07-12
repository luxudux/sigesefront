import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// interface
import { CiudadInterface } from './ciudad-interface';
// Configuration
import { environment } from '../../../environments/environment';
// Own Service HTTP
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  baseUrl: string;
  baseUrlyear: number;
  url: string;
  token: string;

  public ciudades: CiudadInterface[] = [];

  constructor(
    private httpService: HttpService,
  ) {
    this.baseUrl = environment.apiUrl;
    this.baseUrlyear = 2019;
    this.url = `${this.baseUrl}/${this.baseUrlyear}/towns`;
    this.token = 'token';
  }

  setItems(data: CiudadInterface[]) {
    this.ciudades = data;
  }

  getItems(): Observable<Array<CiudadInterface>> {
    // console.log('Get Items');
    // Regresa un observable
    return this.httpService.get(this.url, this.token);
    // return this.http.get<Array<CiudadInterface>>(this.url, options);

  }
  getItem(arrayValues: CiudadInterface): Promise<any> {
    // console.log('Get Item');
    const url = `${this.url}/${arrayValues.id}`;
    // El observador lo convertimos a promesa
    return this.httpService.get(url, this.token)
      // return this.http.delete<Array<CiudadInterface>>(url, options)
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
  addItem(arrayValues: CiudadInterface): Promise<any> {

    // this.url = `${this.baseUrl}/${this.baseUrlyear}/user/login`;
    const params = { name: arrayValues.name, stranger: arrayValues.stranger };
    // El observador lo convertimos a promesa
    return this.httpService.post(this.url, params, this.token)
      .toPromise()
      .then((response) => {
        // console.log('Bueno todo ' + response);
        return response;
      })
      .catch((error) => {
        // console.log('error ' + error);
        return false;
      });
    // console.log('Add Item: ');
    // console.log(arrayValues);
    // if (this.ciudades.push(arrayValues)) {
    //   return true;
    // }
    // return false;
  }
  updateItem(arrayValues: CiudadInterface): Promise<any> {
    // console.log('Update Item');
    // console.log(arrayValues);
    const url = `${this.url}/${arrayValues.id}`;
    const params = { name: arrayValues.name, stranger: arrayValues.stranger };
    // El observador lo convertimos a promesa
    return this.httpService.put(url, params, this.token)
      .toPromise()
      .then((response) => {
        // console.log('Bueno todo ' + response);
        return response;
      })
      .catch((error) => {
        // console.log('error ' + error);
        return false;
      });

    // const numero = arrayValues.id;
    // const index = this.ciudades.findIndex(x => x.id === numero);
    // // console.log('index: ' + index);
    // if (index !== -1) {
    //   this.ciudades[index] = arrayValues;
    //   return true;
    // }
    // return false;
  }
  deleteItem(arrayValues: CiudadInterface): Promise<any> {

    const url = `${this.url}/${arrayValues.id}`;
    // El observador lo convertimos a promesa
    return this.httpService.delete(url, this.token)
      // return this.http.delete<Array<CiudadInterface>>(url, options)
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
}
