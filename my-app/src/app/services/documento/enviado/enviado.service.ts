import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// interface
import { DocumentoInterface } from '../documento-interface';
// Configuration
import { environment } from '../../../../environments/environment';
// Own Service HTTP
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class EnviadoService {

  baseUrl: string;
  baseUrlyear: number;
  url: string;
  token: string;
  // public enviados: DocumentoInterface[] = [
  //   { id: 1, subject: 'Enviado 1', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 2, subject: 'Enviado 2', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 3, subject: 'Enviado 3', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 4, subject: 'Enviado 4', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 5, subject: 'Enviado 5', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 6, subject: 'Enviado 6', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 7, subject: 'Enviado 7', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  // ];
  public enviados: DocumentoInterface[];
  constructor(
    private httpService: HttpService,
  ) {
    this.baseUrl = environment.apiUrl;
    this.baseUrlyear = 2019;
    this.url = `${this.baseUrl}/${this.baseUrlyear}/documents`;
    this.token = 'token';
  }

  setItems(data: DocumentoInterface[]) {
    this.enviados = data;
  }
  getItems(): Observable<Array<DocumentoInterface>> {
    const url = `${this.baseUrl}/${this.baseUrlyear}/documents_sent`;
    return this.httpService.get(url, this.token);
  }
  getItem(arrayValues: DocumentoInterface): Promise<any> {

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

  getItemsSendTo(id: number): Observable<Array<DocumentoInterface>> {
    const url = `${this.baseUrl}/${this.baseUrlyear}/documents_sent_to/${id}`;
    return this.httpService.get(url, this.token);
  }

  getItemsSendState(id: number): Observable<Array<DocumentoInterface>> {
    const url = `${this.baseUrl}/${this.baseUrlyear}/documents_offices_states/${id}`;
    return this.httpService.get(url, this.token);
  }

}
