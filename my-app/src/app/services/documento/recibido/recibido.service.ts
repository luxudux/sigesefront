import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// interface
import { RecibidoInterface } from './recibido-interface';
// Configuration
import { environment } from '../../../../environments/environment';
// Own Service HTTP
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class RecibidoService {

  baseUrl: string;
  baseUrlyear: number;
  url: string;
  token: string;

  // public recibidos: RecibidoInterface[] = [
  //   { id: 1, subject: 'Recibido 1', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 2, subject: 'Recibido 2', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 3, subject: 'Recibido 3', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 4, subject: 'Recibido 4', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 5, subject: 'Recibido 5', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 6, subject: 'Recibido 6', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 7, subject: 'Recibido 7', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  // ];
  public recibidos: RecibidoInterface[];
  constructor(
    private httpService: HttpService,
  ) {
    this.baseUrl = environment.apiUrl;
    this.baseUrlyear = 2019;
    this.url = `${this.baseUrl}/${this.baseUrlyear}/documents`;
    this.token = 'token';
  }

  setItems(data: RecibidoInterface[]) {
    this.recibidos = data;
  }
  getItems(): Observable<Array<RecibidoInterface>> {
    console.log('recibido get items');
    const url = `${this.baseUrl}/${this.baseUrlyear}/documents_received`;
    return this.httpService.get(url, this.token);
  }
  getItem(arrayValues: RecibidoInterface): Promise<any> {

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

  notificarItem(arrayValues: RecibidoInterface): Promise<any> {

    // const url = `${this.url}/${arrayValues.id}`;
    const url = `${this.baseUrl}/${this.baseUrlyear}/documents_received/${arrayValues.id}`;
    const params = {
      preference_id: arrayValues.preference_id,
      state_id: arrayValues.state_id,
      feedback: arrayValues.feedback,
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

  leerItem(arrayValues: RecibidoInterface): Promise<any> {

    let url = `${this.baseUrl}/${this.baseUrlyear}/documents_inbox`;
    url = `${url}/${arrayValues.id}`;
    const params = {
      state_id: arrayValues.state_id,
      feedback: arrayValues.feedback,
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
