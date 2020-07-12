import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// interface
import { PrioridadInterface } from './prioridad-interface';
// Configuration
import { environment } from '../../../environments/environment';
// Own Service HTTP
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class PrioridadService {

  baseUrl: string;
  baseUrlyear: number;
  url: string;
  token: string;

  // private prioridad: PrioridadInterface[] = [
  //   { id: 1, name: 'Baja', icon: 'low_priority', color_icon: 'grey-text text-lighten-1', color_text: '', color_back: '' },
  //   { id: 2, name: 'Media', icon: 'access_time', color_icon: 'grey-text text-darken-1', color_text: '', color_back: '' },
  //   { id: 3, name: 'Alta', icon: 'priority_high', color_icon: 'red-text text-darken-4', color_text: '', color_back: '' },
  // ];
  public prioridades: PrioridadInterface[] = [];
  constructor(
    private httpService: HttpService,
  ) {
    this.baseUrl = environment.apiUrl;
    this.baseUrlyear = 2019;
    this.url = `${this.baseUrl}/${this.baseUrlyear}/preferences`;
    this.token = 'token';
  }

  setItems(data: PrioridadInterface[]) {
    this.prioridades = data;
  }

  getItems() {
    // console.log('Get Items');
    return this.httpService.get(this.url, this.token);
  }
  getItem(arrayValues: PrioridadInterface): Promise<any> {
    // console.log('Get Item');
    const url = `${this.url}/${arrayValues.id}`;
    // El observador lo convertimos a promesa
    return this.httpService.get(url, this.token)
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
  addItem(arrayValues: PrioridadInterface): Promise<any> {
    // console.log('Add Item: ');
    const params = {
      name: arrayValues.name,
      icon: arrayValues.icon,
      color_icon: arrayValues.color_icon,
      color_text: arrayValues.color_text,
      color_back: arrayValues.color_back,
    };
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
  }
  updateItem(arrayValues: PrioridadInterface): Promise<any> {
    // console.log('Update Item');
    const url = `${this.url}/${arrayValues.id}`;
    const params = {
      name: arrayValues.name,
      icon: arrayValues.icon,
      color_icon: arrayValues.color_icon,
      color_text: arrayValues.color_text,
      color_back: arrayValues.color_back,
    };
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
  }
  deleteItem(arrayValues: PrioridadInterface): Promise<any> {
    // console.log('Delete Item');
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
