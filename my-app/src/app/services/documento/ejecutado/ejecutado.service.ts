import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// interface
import { EjecutadoInterface } from './ejecutado-interface';
// Configuration
import { environment } from '../../../../environments/environment';
// Own Service HTTP
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class EjecutadoService {

  baseUrl: string;
  baseUrlyear: number;
  url: string;
  token: string;

  // public ejecutados: EjecutadoInterface[] = [
  //   { id: 1, subject: 'Ejecutado 1', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 2, subject: 'Ejecutado 2', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 3, subject: 'Ejecutado 3', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 4, subject: 'Ejecutado 4', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 5, subject: 'Ejecutado 5', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 6, subject: 'Ejecutado 6', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 7, subject: 'Ejecutado 7', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },

  // ];
  public ejecutados: EjecutadoInterface[];
  constructor(
    private httpService: HttpService,
  ) {
    this.baseUrl = environment.apiUrl;
    this.baseUrlyear = 2019;
    this.url = `${this.baseUrl}/${this.baseUrlyear}/documents`;
    this.token = 'token';
  }

  setItems(data: EjecutadoInterface[]) {
    this.ejecutados = data;
  }
  getItems(): Observable<Array<EjecutadoInterface>> {
    console.log('ejecutado get items');
    const url = `${this.baseUrl}/${this.baseUrlyear}/documents_executed`;
    return this.httpService.get(url, this.token);
  }
  getItem(arrayValues: EjecutadoInterface): Promise<any> {

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

  finalizarItem(arrayValues: EjecutadoInterface): Promise<any> {

    const url = `${this.baseUrl}/${this.baseUrlyear}/documents_finished/${arrayValues.id}`;
    const params = {
      state_id: arrayValues.state_id,
      conclution_id: arrayValues.conclution_id,
    };
    return this.httpService.patch(url, params, this.token)
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        // console.log('error ' + error);
        return false;
      });
  }
}

