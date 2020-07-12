import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
// SERVICES
import { UsuarioService } from '../../services/usuario/usuario.service';
import { OficinaService } from '../../services/oficina/oficina.service';
// INTERFACE AND SERVICE PERMIT
import { PermisoInterface } from '../../services/permiso/permiso-interface';
import { PermisoService } from '../../services/permiso/permiso.service';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
// EMITIR EVENTO
import { Output, EventEmitter } from '@angular/core';
// Configuration
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-permit-update',
  templateUrl: './permit-update.component.html',
  styleUrls: ['./permit-update.component.css']
})
export class PermitUpdateComponent implements OnInit {

  public title: string;
  public grupoForm: FormGroup;

  updateNo: number;
  updateUsuarioId: number;
  updateOficinaId: number;
  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;
  // SELECT
  selectUsuarios: Array<any>;
  selectOficinas: Array<any>;

  @Output() updateFine = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // tslint:disable-next-line:no-shadowed-variable
    public PermisoService: PermisoService,
    // tslint:disable-next-line:no-shadowed-variable
    public UsuarioService: UsuarioService,
    // tslint:disable-next-line:no-shadowed-variable
    public OficinaService: OficinaService,
    private dialogRef: MatDialogRef<PermitUpdateComponent>,
    public dialog: MatDialog,
  ) {
    // console.log(data);
    this.updateNo = data.id;
    this.updateUsuarioId = data.user_id;
    this.updateOficinaId = data.office_id;
    this.title = 'Actualizar Registro';
  }

  ngOnInit() {
    // VALIDACION
    this.grupoForm = new FormGroup({

      usuario: new FormControl(+this.updateUsuarioId, [
        Validators.required,
      ]),
      oficina: new FormControl(+this.updateOficinaId, [
        Validators.required,
      ]),

    });

    // GET DATA SELECT
    this.getUsuarios();
    this.getOficinas();
  }

  getUsuarios() {
    const result = this.UsuarioService.getItems();
    // console.log(result);
    result.toPromise()
      .then((response: any) => {
        this.selectUsuarios = response.data;
        console.log(response.data);
      })
      .catch(error => console.log('Error', error));
  }
  getOficinas() {
    const result = this.OficinaService.getItems();
    // console.log(result);
    result.toPromise()
      .then((response: any) => {
        this.selectOficinas = response.data;
        console.log(response.data);
      })
      .catch(error => console.log('Error', error));
  }

  updateResource(form: any) {

    console.log('Actualizando');

    // console.log(form);
    const arrayValues: PermisoInterface = {
      id: this.updateNo,
      office_id: form.value.oficina,
      user_id: form.value.usuario,
    };
    console.log(' Array primero: ' + arrayValues);
    console.log(arrayValues);
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.PermisoService.updateItem(arrayValues);

    result.then((response) => {
      if (response) {
        this.updateFine.emit(response); // Emitiendo evento
        this.dialogRef.close(); // Close and refresh
        this.loadingDialogRef.close();
      } else {
        this.dialogRef.close(); // Close and refresh
        this.loadingDialogRef.close();
        this.errorDialogRef = this.dialog.open(
          DialogErrorComponent, { disableClose: true });
      }
    });
  }

}
