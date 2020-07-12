import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// interface
import { EntradaInterface } from './entrada-interface';
// Configuration
import { environment } from '../../../../environments/environment';
// Own Service HTTP
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class EntradaService {

  baseUrl: string;
  baseUrlyear: number;
  url: string;
  token: string;

  public entradas: EntradaInterface[];
  constructor(
    private httpService: HttpService,
  ) {
    this.baseUrl = environment.apiUrl;
    this.baseUrlyear = 2019;
    this.url = `${this.baseUrl}/${this.baseUrlyear}/documents_inbox`;
    this.token = 'token';
  }

  setItems(data: EntradaInterface[]) {
    this.entradas = data;
  }
  getItems(): Observable<Array<EntradaInterface>> {
    console.log('entrada get items');
    const url = `${this.baseUrl}/${this.baseUrlyear}/documents_inbox`;
    return this.httpService.get(url, this.token);
  }

  recibirItem(arrayValues: EntradaInterface): Promise<any> {

    let url = `${this.baseUrl}/${this.baseUrlyear}/documents_inbox`;
    url = `${url}/${arrayValues.id}`;
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
}
