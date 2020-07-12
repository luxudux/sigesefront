import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// interface
import { TrabajadorInterface } from './trabajador-interface';
// Configuration
import { environment } from '../../../environments/environment';
// Own Service HTTP
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {

  baseUrl: string;
  baseUrlyear: number;
  url: string;
  token: string;

  // private trabajadores: TrabajadorInterface[] = [
  //   { id: 1, name: 'Trabajador 1', surname: 'surname',
  //   mail: 'pueba@mail.com', sex: 'H', active: 'S',
  //   office_id: 1, created_at: '05/10/84', updated_at: '05/10/84'},
  //   { id: 2, name: 'Trabajador 2', surname: 'surname',
  //   mail: 'pueba@mail.com', sex: 'H', active: 'S',
  //   office_id: 1, created_at: '05/10/84', updated_at: '05/10/84'},
  //   { id: 3, name: 'Trabajador 3', surname: 'surname',
  //   mail: 'pueba@mail.com', sex: 'H', active: 'S',
  //   office_id: 1, created_at: '05/10/84', updated_at: '05/10/84'},
  //   { id: 4, name: 'Trabajador 4', surname: 'urnames',
  //   mail: 'pueba@mail.com', sex: 'H', active: 'S',
  //   office_id: 1, created_at: '05/10/84', updated_at: '05/10/84'},
  //   { id: 5, name: 'Trabajador 5', surname: 'surname',
  //   mail: 'pueba@mail.com', sex: 'H', active: 'S',
  //   office_id: 1, created_at: '05/10/84', updated_at: '05/10/84'},
  //   { id: 6, name: 'Trabajador 6', surname: 'surname',
  //   mail: 'pueba@mail.com', sex: 'M', active: 'N',
  //   office_id: 1, created_at: '05/10/84', updated_at: '05/10/84'},
  //   { id: 7, name: 'Trabajador 7', surname: 'surname',
  //   mail: 'pueba@mail.com', sex: 'H', active: 'S',
  //   office_id: 1, created_at: '05/10/84', updated_at: '05/10/84'},
  // ];
  public trabajadores: TrabajadorInterface[];
  constructor(
    private httpService: HttpService,
  ) {
    this.baseUrl = environment.apiUrl;
    this.baseUrlyear = 2019;
    this.url = `${this.baseUrl}/${this.baseUrlyear}/workers`;
    this.token = 'token';
  }

  setItems(data: TrabajadorInterface[]) {
    this.trabajadores = data;
  }

  getItems(): Observable<Array<TrabajadorInterface>> {

    return this.httpService.get(this.url, this.token);
  }
  getItem(arrayValues: TrabajadorInterface): Promise<any> {

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
  addItem(arrayValues: TrabajadorInterface): Promise<any> {

    const params = {
      name: arrayValues.name,
      surname: arrayValues.surname,
      mail: arrayValues.mail,
      sex: arrayValues.sex,
      active: arrayValues.active,
      office_id: arrayValues.office_id,
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
  updateItem(arrayValues: TrabajadorInterface): Promise<any> {

    const url = `${this.url}/${arrayValues.id}`;
    const params = {
      name: arrayValues.name,
      surname: arrayValues.surname,
      mail: arrayValues.mail,
      sex: arrayValues.sex,
      active: arrayValues.active,
      office_id: arrayValues.office_id,
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
  deleteItem(arrayValues: TrabajadorInterface): Promise<any> {

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
