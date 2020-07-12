import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// interface
import { ConclusionInterface } from './conclusion-interface';
// Configuration
import { environment } from '../../../environments/environment';
// Own Service HTTP
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ConclusionService {

  baseUrl: string;
  baseUrlyear: number;
  url: string;
  token: string;
  // public conclusiones: ConclusionInterface[] = [
  //   { id: 1, name: 'Pendiente', icon: 'warning', color_icon: 'grey-text text-lighten-1', },
  //   { id: 2, name: 'Terminado', icon: 'done', color_icon: 'green-text text-darken-1', },
  // ];
  public conclusiones: ConclusionInterface[];
  constructor(
    private httpService: HttpService,
  ) {
    this.baseUrl = environment.apiUrl;
    this.baseUrlyear = 2019;
    this.url = `${this.baseUrl}/${this.baseUrlyear}/conclutions`;
    this.token = 'token';
  }

  setItems(data: ConclusionInterface[]) {
    this.conclusiones = data;
  }

  getItems(): Observable<Array<ConclusionInterface>> {

    return this.httpService.get(this.url, this.token);
  }
  getItem(arrayValues: ConclusionInterface): Promise<any> {

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
  addItem(arrayValues: ConclusionInterface): Promise<any> {

    const params = {
      name: arrayValues.name,
      icon: arrayValues.icon,
      color_icon: arrayValues.color_icon,
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
  updateItem(arrayValues: ConclusionInterface): Promise<any> {

    const url = `${this.url}/${arrayValues.id}`;
    const params = {
      name: arrayValues.name,
      icon: arrayValues.icon,
      color_icon: arrayValues.color_icon,
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
  deleteItem(arrayValues: ConclusionInterface): Promise<any> {

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
