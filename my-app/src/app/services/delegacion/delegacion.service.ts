import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// interface
import { DelegacionInterface } from './delegacion-interface';
// Configuration
import { environment } from '../../../environments/environment';
// Own Service HTTP
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class DelegacionService {

  baseUrl: string;
  baseUrlyear: number;
  url: string;
  token: string;
  // parametros: HttpParams;
  // public delegacionesRest: any;
  // public delegaciones: DelegacionInterface[] = [
  //   { id: 1, name: 'Delegación 1', acronym: 'DEL-1' },
  //   { id: 2, name: 'Delegación 2', acronym: 'DEL-2' },
  //   { id: 3, name: 'Delegación 3', acronym: 'DEL-3' },
  //   { id: 4, name: 'Delegación 4', acronym: 'DEL-4' },
  //   { id: 5, name: 'Delegación 5', acronym: 'DEL-5' },
  // ];
  public delegaciones: DelegacionInterface[] = [];
  constructor(
    private httpService: HttpService,
  ) {
    // this.baseUrl = 'https://ideasencodigo.com/api/sigese/v1/2019';
    this.baseUrl = environment.apiUrl;
    this.baseUrlyear = 2019;
    this.url = `${this.baseUrl}/${this.baseUrlyear}/delegations`;
    this.token = 'token';
  }

  setItems(data: DelegacionInterface[]) {
    this.delegaciones = data;
  }

  getItems(): Observable<Array<DelegacionInterface>> {
    // console.log('Get Items');
    // Regresa un observable
    return this.httpService.get(this.url, this.token);
    // return this.http.get<Array<DelegacionInterface>>(this.url, options);

  }
  getItem(arrayValues: DelegacionInterface): Promise<any> {
    // console.log('Get Item');
    const url = `${this.url}/${arrayValues.id}`;
    // El observador lo convertimos a promesa
    return this.httpService.get(url, this.token)
      // return this.http.delete<Array<DelegacionInterface>>(url, options)
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
  addItem(arrayValues: DelegacionInterface): Promise<any> {

    // this.url = `${this.baseUrl}/${this.baseUrlyear}/user/login`;
    const params = { name: arrayValues.name, acronym: arrayValues.acronym };
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
    // if (this.delegaciones.push(arrayValues)) {
    //   return true;
    // }
    // return false;
  }
  updateItem(arrayValues: DelegacionInterface): Promise<any> {
    // console.log('Update Item');
    // console.log(arrayValues);
    const url = `${this.url}/${arrayValues.id}`;
    const params = { name: arrayValues.name, acronym: arrayValues.acronym };
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
    // const index = this.delegaciones.findIndex(x => x.id === numero);
    // // console.log('index: ' + index);
    // if (index !== -1) {
    //   this.delegaciones[index] = arrayValues;
    //   return true;
    // }
    // return false;
  }
  deleteItem(arrayValues: DelegacionInterface): Promise<any> {

    const url = `${this.url}/${arrayValues.id}`;
    // El observador lo convertimos a promesa
    return this.httpService.delete(url, this.token)
      // return this.http.delete<Array<DelegacionInterface>>(url, options)
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
