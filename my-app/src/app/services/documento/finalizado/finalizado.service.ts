import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// interface
import { FinalizadoInterface } from './finalizado-interface';
// Configuration
import { environment } from '../../../../environments/environment';
// Own Service HTTP
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class FinalizadoService {

  baseUrl: string;
  baseUrlyear: number;
  url: string;
  token: string;

  // public finalizados: FinalizadoInterface[] = [
  //   { id: 1, subject: 'Finalizado 1', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 2, subject: 'Finalizado 2', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 3, subject: 'Finalizado 3', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 4, subject: 'Finalizado 4', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 5, subject: 'Finalizado 5', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 6, subject: 'Finalizado 6', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 7, subject: 'Finalizado 7', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  // ];
  public enviados: FinalizadoInterface[];
  constructor(
    private httpService: HttpService,
  ) {
    this.baseUrl = environment.apiUrl;
    this.baseUrlyear = 2019;
    this.url = `${this.baseUrl}/${this.baseUrlyear}/documents`;
    this.token = 'token';
  }

  setItems(data: FinalizadoInterface[]) {
    this.enviados = data;
  }
  getItems(): Observable<Array<FinalizadoInterface>> {
    console.log('finalizado get items');
    const url = `${this.baseUrl}/${this.baseUrlyear}/documents_finished`;
    return this.httpService.get(url, this.token);
  }
  getItem(arrayValues: FinalizadoInterface): Promise<any> {

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
}
