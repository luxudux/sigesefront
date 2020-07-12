import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// interface
import { NivelInterface } from './nivel-interface';
// Configuration
import { environment } from '../../../environments/environment';
// Own Service HTTP
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class NivelService {

  baseUrl: string;
  baseUrlyear: number;
  url: string;
  token: string;

  // public niveles: NivelInterface[] = [
  //   { id: 1, name: 'Nivel 1' },
  //   { id: 2, name: 'Nivel 2' },
  //   { id: 3, name: 'Nivel 3' },
  //   { id: 4, name: 'Nivel 4' }
  // ];
  public niveles: NivelInterface[];
  constructor(
    private httpService: HttpService,
  ) {
    this.baseUrl = environment.apiUrl;
    this.baseUrlyear = 2019;
    this.url = `${this.baseUrl}/${this.baseUrlyear}/levels`;
    this.token = 'token';
   }

   setItems(data: NivelInterface[]) {
    this.niveles = data;
  }

  getItems(): Observable<Array<NivelInterface>> {

    return this.httpService.get(this.url, this.token);
  }
  getItem(arrayValues: NivelInterface): Promise<any> {

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
  addItem(arrayValues: NivelInterface): Promise<any> {

    const params = {
      name: arrayValues.name,
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
  updateItem(arrayValues: NivelInterface): Promise<any> {

    const url = `${this.url}/${arrayValues.id}`;
    const params = {
      name: arrayValues.name,
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
  deleteItem(arrayValues: NivelInterface): Promise<any> {

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
