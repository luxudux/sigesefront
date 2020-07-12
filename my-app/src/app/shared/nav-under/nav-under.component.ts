import { Component, OnInit, Input } from '@angular/core';
// SERVICIO
import { PermisoService } from '../../services/permiso/permiso.service';

@Component({
  selector: 'app-nav-under',
  templateUrl: './nav-under.component.html',
  styleUrls: ['./nav-under.component.css']
})
export class NavUnderComponent implements OnInit {
  color = 'accent';
  checked = true;
  disabled = false;
  messageTooltip: string;
  nameDependencia: string;

  @Input() public nameModule: string;
  @Input() public nameLevel: string;
  constructor(
            // tslint:disable-next-line:no-shadowed-variable
            public PermisoService: PermisoService,
  ) { }

  ngOnInit() {
    this.nameModule = '';
    // this.nameLevel = '';
    this.HistorialAccion();

    // this.nameDependencia = this.PermisoService.getActivoNombre();
    // console.log(this.PermisoService.getActivo());

  }
  HistorialAccion() {
    this.checked = !this.checked;
    if (this.checked) {
      this.messageTooltip = 'Modo historial activado';
    } else {
      this.messageTooltip = 'Modo historial desactivado';
    }
    // console.log(this.messageTooltip);
  }
}
