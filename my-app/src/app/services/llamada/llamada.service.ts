import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// interface
import { LlamadaInterface } from './llamada-interface';
// Configuration
import { environment } from '../../../environments/environment';
// Own Service HTTP
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class LlamadaService {

  baseUrl: string;
  baseUrlyear: number;
  url: string;
  token: string;

  // public llamadas: LlamadaInterface[] = [
  //   {id: 1, note: 'Llamada 1', day: '05/10/1984', hour: '15:03', contact_id: 2},
  //   {id: 2, note: 'Llamada 2', day: '05/10/1984', hour: '15:03', contact_id: 2},
  //   {id: 3, note: 'Llamada 3', day: '05/10/1984', hour: '15:03', contact_id: 2},
  //   {id: 4, note: 'Llamada 4', day: '05/10/1984', hour: '15:03', contact_id: 2},
  //   {id: 5, note: 'Llamada 5', day: '05/10/1984', hour: '15:03', contact_id: 2},
  // ];
  public llamadas: LlamadaInterface[];
  constructor(
    private httpService: HttpService,
  ) {
    this.baseUrl = environment.apiUrl;
    this.baseUrlyear = 2019;
    this.url = `${this.baseUrl}/${this.baseUrlyear}/calls`;
    this.token = 'token';
  }

  setItems(data: LlamadaInterface[]) {
    this.llamadas = data;
  }
  getItems(): Observable<Array<LlamadaInterface>> {

    return this.httpService.get(this.url, this.token);
  }
  getItem(arrayValues: LlamadaInterface): Promise<any> {

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
  addItem(arrayValues: LlamadaInterface): Promise<any> {

    const params = {
      note: arrayValues.note,
      day: arrayValues.day,
      contact_id: arrayValues.contact_id,

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
  updateItem(arrayValues: LlamadaInterface): Promise<any> {
    // console.log(arrayValues);
    const url = `${this.url}/${arrayValues.id}`;
    const params = {
      note: arrayValues.note,
      day: arrayValues.day,
      contact_id: arrayValues.contact_id,
    };
    return this.httpService.put(url, params, this.token)
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        // console.log('error ' + error);
        // console.log(error);
        return false;
      });
  }
  deleteItem(arrayValues: LlamadaInterface): Promise<any> {

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
