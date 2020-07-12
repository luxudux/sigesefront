import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// interface
import { NotificadoInterface } from './notificado-interface';
// Configuration
import { environment } from '../../../../environments/environment';
// Own Service HTTP
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class NotificadoService {

  baseUrl: string;
  baseUrlyear: number;
  url: string;
  token: string;

  // public notificados: NotificadoInterface[] = [
  //   { id: 1, subject: 'Notificado 1', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 2, subject: 'Notificado 2', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 3, subject: 'Notificado 3', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 4, subject: 'Notificado 4', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 5, subject: 'Notificado 5', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 6, subject: 'Notificado 6', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 7, subject: 'Notificado 7', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  // ];
  public notificados: NotificadoInterface[];
  constructor(
    private httpService: HttpService,
  ) {
    this.baseUrl = environment.apiUrl;
    this.baseUrlyear = 2019;
    this.url = `${this.baseUrl}/${this.baseUrlyear}/documents`;
    this.token = 'token';
  }

  setItems(data: NotificadoInterface[]) {
    this.notificados = data;
  }
  getItems(): Observable<Array<NotificadoInterface>> {
    console.log('notificado get items');
    const url = `${this.baseUrl}/${this.baseUrlyear}/documents_notified`;
    return this.httpService.get(url, this.token);
  }
  getItem(arrayValues: NotificadoInterface): Promise<any> {

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
  ejecutarItem(arrayValues: NotificadoInterface): Promise<any> {

    let url = `${this.baseUrl}/${this.baseUrlyear}/documents_notified`;
    url = `${url}/${arrayValues.id}`;
    const params = {
      state_id: arrayValues.state_id,
      workers: arrayValues.workers,
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
