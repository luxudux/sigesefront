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
export class ElaboradoService {

  baseUrl: string;
  baseUrlyear: number;
  url: string;
  token: string;

  // public elaborados: DocumentoInterface[] = [
  //   { id: 1, subject: 'Elaborado 1', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 2, subject: 'Elaborado 2', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 3, subject: 'Elaborado 3', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 4, subject: 'Elaborado 4', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 5, subject: 'Elaborado 5', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 6, subject: 'Elaborado 6', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },
  //   { id: 7, subject: 'Elaborado 7', expiration: '05/10/1984', conclution_id: 1, preference_id: 2, url: 'http://doc.com' },

  // ];
  public notificados: DocumentoInterface[];
  constructor(
    private httpService: HttpService,
  ) {
    this.baseUrl = environment.apiUrl;
    this.baseUrlyear = 2019;
    this.url = `${this.baseUrl}/${this.baseUrlyear}/documents`;
    this.token = 'token';
   }

   setItems(data: DocumentoInterface[]) {
    this.notificados = data;
  }
  getItems(): Observable<Array<DocumentoInterface>> {
    const url = `${this.baseUrl}/${this.baseUrlyear}/documents_elaborated`;
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
  addItem(arrayValues: DocumentoInterface) {

    const url = `${this.url}`;
    const params = {
      subject: arrayValues.subject,
      expiration: arrayValues.expiration,
      url: arrayValues.url,
      type_id: arrayValues.type_id,
      preference_id: arrayValues.preference_id,
      control: arrayValues.control,
      conclution_id: arrayValues.conclution_id,
      state_id: arrayValues.state_id,
      feedback: arrayValues.feedback
    };
    return this.httpService.post(url, params, this.token)
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        // console.log('error ' + error);
        return false;
      });
  }
  updateItem(arrayValues: DocumentoInterface) {

    const url = `${this.url}/${arrayValues.id}`;
    const params = {
      subject: arrayValues.subject,
      expiration: arrayValues.expiration,
      url: arrayValues.url,
      type_id: arrayValues.type_id,
      preference_id: arrayValues.preference_id,
      control: arrayValues.control,
      conclution_id: arrayValues.conclution_id,
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
  deleteItem(arrayValues: DocumentoInterface): Promise<any> {

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
  adjuntarFile() {
    // console.log('Adjuntar File in Item');
  }

  sendItems(arrayValues: any) {

    const url = `${this.baseUrl}/${this.baseUrlyear}/documents_sent`;
    const params = {
      document_id: arrayValues.document_id,
      offices: arrayValues.offices,
      state_id: arrayValues.state_id,
      feedback: arrayValues.feedback,
    };
    // console.log(arrayValues);
    // console.log(params);
    return this.httpService.post(url, params, this.token)
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
