import { Injectable } from '@angular/core';
// interface
import { ActivoInterface } from './activo-interface';

@Injectable({
  providedIn: 'root'
})
export class ActivoService {

  private activos: ActivoInterface[] = [
    {id: 'S', nombre: 'Si'},
    {id: 'N', nombre: 'No'}
  ];
  constructor() { }

  getLista() {
    return this.activos;
  }


}


