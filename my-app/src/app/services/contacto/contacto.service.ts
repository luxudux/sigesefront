import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// interface
import { ContactoInterface } from './contacto-interface';
// Configuration
import { environment } from '../../../environments/environment';
// Own Service HTTP
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  baseUrl: string;
  baseUrlyear: number;
  url: string;
  token: string;

  // private contactos: ContactoInterface[] = [
  //   {
  //     id: 1, name: 'Contacto 1', surname: 'Hydrogen', town_id: 'Colima', phone_p: '31212121', phone_s: '12345633',
  //     sex: 'M', mail: 'contact@correo.com', institution: 'INSTIT', office_id: 1, user_id: 1
  //   },
  //   {
  //     id: 2, name: 'Contacto 2', surname: 'Helium', town_id: 'Colima', phone_p: '31212121', phone_s: '12345633',
  //     sex: 'M', mail: 'contact@correo.com', institution: 'INSTIT', office_id: 1, user_id: 1
  //   },
  //   {
  //     id: 3, name: 'Contacto 3', surname: 'Lithium', town_id: 'Colima', phone_p: '31212121', phone_s: '12345633',
  //     sex: 'M', mail: 'contact@correo.com', institution: 'INSTIT', office_id: 1, user_id: 1
  //   },
  //   {
  //     id: 4, name: 'Contacto 4', surname: 'Beryllium', town_id: 'Colima', phone_p: '31212121', phone_s: '12345633',
  //     sex: 'M', mail: 'contact@correo.com', institution: 'INSTIT', office_id: 1, user_id: 1
  //   },
  //   {
  //     id: 5, name: 'Contacto 5', surname: 'Boron', town_id: 'Colima', phone_p: '31212121', phone_s: '12345633',
  //     sex: 'M', mail: 'contact@correo.com', institution: 'INSTIT', office_id: 1, user_id: 1
  //   }

  // ];
  public contactos: ContactoInterface[];
  constructor(
    private httpService: HttpService,
  ) {
    this.baseUrl = environment.apiUrl;
    this.baseUrlyear = 2019;
    this.url = `${this.baseUrl}/${this.baseUrlyear}/contacts`;
    this.token = 'token';
  }

  setItems(data: ContactoInterface[]) {
    this.contactos = data;
  }

  getItems(): Observable<Array<ContactoInterface>> {

    return this.httpService.get(this.url, this.token);
  }
  getItem(arrayValues: ContactoInterface): Promise<any> {

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
  addItem(arrayValues: ContactoInterface): Promise<any> {

    const params = {
      name: arrayValues.name,
      surname: arrayValues.surname,
      town_id: arrayValues.town_id,
      phone_p: arrayValues.phone_p,
      phone_s: arrayValues.phone_s,
      sex: arrayValues.sex,
      mail: arrayValues.mail,
      institution: arrayValues.institution,
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
  updateItem(arrayValues: ContactoInterface): Promise<any> {

    const url = `${this.url}/${arrayValues.id}`;
    const params = {
      name: arrayValues.name,
      surname: arrayValues.surname,
      town_id: arrayValues.town_id,
      phone_p: arrayValues.phone_p,
      phone_s: arrayValues.phone_s,
      sex: arrayValues.sex,
      mail: arrayValues.mail,
      institution: arrayValues.institution,
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
  deleteItem(arrayValues: ContactoInterface): Promise<any> {

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
