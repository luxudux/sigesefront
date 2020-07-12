import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// interface
import { OficinaInterface } from './oficina-interface';
import { OficinaGroupInterface } from './oficina-group-interface';
// Configuration
import { environment } from '../../../environments/environment';
// Own Service HTTP
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class OficinaService {

  baseUrl: string;
  baseUrlyear: number;
  url: string;
  token: string;

  // public oficinas: OficinaInterface[] = [
  //   { id: 1, name: 'Oficina 1', acronym: 'CRO', code: '2263', mail: 'office@mail.com', delegation_id: 2 },
  //   { id: 2, name: 'Oficina 2', acronym: 'CRO', code: '2263', mail: 'office@mail.com', delegation_id: 3 },
  //   { id: 3, name: 'Oficina 3', acronym: 'CRO', code: '2263', mail: 'office@mail.com', delegation_id: 4 },
  //   { id: 4, name: 'Oficina 4', acronym: 'CRO', code: '2263', mail: 'office@mail.com', delegation_id: 5 },
  //   { id: 5, name: 'Oficina 5', acronym: 'CRO', code: '2263', mail: 'office@mail.com', delegation_id: 1 },
  //   { id: 6, name: 'Oficina 6', acronym: 'CRO', code: '2263', mail: 'office@mail.com', delegation_id: 2 },
  //   { id: 7, name: 'Oficina 7', acronym: 'CRO', code: '2263', mail: 'office@mail.com', delegation_id: 3 },
  //   { id: 8, name: 'Oficina 8', acronym: 'CRO', code: '2263', mail: 'office@mail.com', delegation_id: 4 },
  //   { id: 9, name: 'Oficina 9', acronym: 'CRO', code: '2263', mail: 'office@mail.com', delegation_id: 5 },
  //   { id: 10, name: 'Oficina 10', acronym: 'CRO', code: '2263', mail: 'office@mail.com', delegation_id: 1 },
  // ];
  public oficinas: OficinaInterface[];
  // private oficinaGroups: OficinaGroupInterface[];
  // private oficinaGroups: Array<OficinaGroupInterface> = [
  //   {
  //     nombreGrupo: 'Delegación 1',
  //     oficina: [
  //       { id: 1, name: 'Of1-Del1' },
  //       { id: 2, name: 'Of2-Del1' },
  //       { id: 3, name: 'Of3-Del1' }
  //     ]
  //   }
  // ];
  constructor(
    private httpService: HttpService,
  ) {
    this.baseUrl = environment.apiUrl;
    this.baseUrlyear = 2019;
    this.url = `${this.baseUrl}/${this.baseUrlyear}/offices`;
    this.token = 'token';
  }

  // isEmpty(obj) {
  //   for (const key in obj) {
  //     if (obj.hasOwnProperty(key)) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }
  setItems(data: OficinaInterface[]) {
    this.oficinas = data;
  }
  // getItemsGroup() {

  //   if (this.isEmpty(this.oficinaGroups)) {

  //     for (let i = 1; i <= 5; i++) {
  //       const oficinaItem = {
  //         nombreGrupo: 'Delegación: ' + i,
  //         disabled: false,
  //         oficina: this.getItems(),
  //       };
  //       this.oficinaGroups.push(oficinaItem);
  //     }
  //   } else {
  //     // Object is NOT empty
  //   }
  //   return this.oficinaGroups;
  //   // console.log(resultGrupo);
  // }
  getItems(): Observable<Array<OficinaInterface>> {

    return this.httpService.get(this.url, this.token);
  }
  getItem(arrayValues: OficinaInterface): Promise<any> {

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
  addItem(arrayValues: OficinaInterface): Promise<any> {

    const params = {
      name: arrayValues.name,
      acronym: arrayValues.acronym,
      code: arrayValues.code,
      mail: arrayValues.mail,
      delegation_id: arrayValues.delegation_id,
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
  updateItem(arrayValues: OficinaInterface): Promise<any> {

    const url = `${this.url}/${arrayValues.id}`;
    const params = {
      name: arrayValues.name,
      acronym: arrayValues.acronym,
      code: arrayValues.code,
      mail: arrayValues.mail,
      delegation_id: arrayValues.delegation_id,
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
  deleteItem(arrayValues: OficinaInterface): Promise<any> {

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
