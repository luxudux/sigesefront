import { Component, OnInit } from '@angular/core';
// SERVICIO
import { PermisoService } from '../../services/permiso/permiso.service';

@Component({
  selector: 'app-nav-sup-der',
  templateUrl: './nav-sup-der.component.html',
  styleUrls: ['./nav-sup-der.component.css']
})
export class NavSupDerComponent implements OnInit {

  constructor(
              // tslint:disable-next-line:no-shadowed-variable
              public PermisoService: PermisoService,
  ) { }

  ngOnInit() {
  }

}
