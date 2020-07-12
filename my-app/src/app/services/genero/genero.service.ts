import { Injectable } from '@angular/core';
// interface
import { GeneroInterface } from './genero-interface';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  private generos: GeneroInterface[] = [
    {id: 'H', nombre: 'Hombre'},
    {id: 'M', nombre: 'Mujer'}
  ];
  constructor() { }

  getLista() {
    return this.generos;
  }
}
