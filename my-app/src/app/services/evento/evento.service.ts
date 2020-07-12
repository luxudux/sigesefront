import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// interface
import { EventoInterface } from './evento-interface';
// Configuration
import { environment } from '../../../environments/environment';
// Own Service HTTP
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  baseUrl: string;
  baseUrlyear: number;
  url: string;
  token: string;

  // public eventos: EventoInterface[] = [

  //   { id: 1, title: 'Evento 1', description: 'description', start: '26/02/2019', start_time: '18:01',
  //   end: '26/02/2019', end_time: '18:01', preference_id: 1 },
  //   { id: 2, title: 'Evento 2', description: 'description', start: '26/02/2019', start_time: '18:01',
  //   end: '26/02/2019', end_time: '18:01', preference_id: 1 },
  //   { id: 3, title: 'Evento 3', description: 'description', start: '26/02/2019', start_time: '18:01',
  //   end: '26/02/2019', end_time: '18:01', preference_id: 1 },
  //   { id: 4, title: 'Evento 4', description: 'description', start: '26/02/2019', start_time: '18:01',
  //   end: '26/02/2019', end_time: '18:01', preference_id: 1 },
  //   { id: 5, title: 'Evento 5', description: 'description', start: '26/02/2019', start_time: '18:01',
  //   end: '26/02/2019', end_time: '18:01', preference_id: 1 },
  //   { id: 6, title: 'Evento 6', description: 'description', start: '26/02/2019', start_time: '18:01',
  //   end: '26/02/2019', end_time: '18:01', preference_id: 1 },
  //   { id: 7, title: 'Evento 7', description: 'description', start: '26/02/2019', start_time: '18:01',
  //   end: '26/02/2019', end_time: '18:01', preference_id: 1 },
  //   { id: 8, title: 'Evento 8', description: 'description', start: '26/02/2019', start_time: '18:01',
  //   end: '26/02/2019', end_time: '18:01', preference_id: 1 },
  //   { id: 9, title: 'Evento 9', description: 'description', start: '26/02/2019', start_time: '18:01',
  //   end: '26/02/2019', end_time: '18:01', preference_id: 1 },

  // ];
  public eventos: EventoInterface[];
  constructor(
    private httpService: HttpService,
  ) {
    this.baseUrl = environment.apiUrl;
    this.baseUrlyear = 2019;
    this.url = `${this.baseUrl}/${this.baseUrlyear}/events`;
    this.token = 'token';
  }

  setItems(data: EventoInterface[]) {
    this.eventos = data;
  }
  getItems(): Observable<Array<EventoInterface>> {

    return this.httpService.get(this.url, this.token);
  }
  getItem(arrayValues: EventoInterface): Promise<any> {

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
  addItem(arrayValues: EventoInterface): Promise<any> {

    const params = {
      title: arrayValues.title,
      description: arrayValues.description,
      start: arrayValues.start,
      end: arrayValues.end,
      preference_id: arrayValues.preference_id,
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
  updateItem(arrayValues: EventoInterface): Promise<any> {
    // console.log(arrayValues);
    const url = `${this.url}/${arrayValues.id}`;
    const params = {
      title: arrayValues.title,
      description: arrayValues.description,
      start: arrayValues.start,
      end: arrayValues.end,
      preference_id: arrayValues.preference_id,
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
  deleteItem(arrayValues: EventoInterface): Promise<any> {

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
