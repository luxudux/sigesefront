import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
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
  selector: 'app-permit-add',
  templateUrl: './permit-add.component.html',
  styleUrls: ['./permit-add.component.css']
})
export class PermitAddComponent implements OnInit {

  public title: string;
  public grupoForm: FormGroup;
  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;
  // SELECT
  selectUsuarios: Array<any>;
  selectOficinas: Array<any>;

  @Output() addFine = new EventEmitter<any>();

  constructor(
     // tslint:disable-next-line:no-shadowed-variable
     public PermisoService: PermisoService,
     // tslint:disable-next-line:no-shadowed-variable
     public UsuarioService: UsuarioService,
     // tslint:disable-next-line:no-shadowed-variable
     public OficinaService: OficinaService,
     private dialogRef: MatDialogRef<PermitAddComponent>,
     public dialog: MatDialog,
  ) {
    this.title = 'Nuevo Registro';
  }

  ngOnInit() {
    // VALIDACION
    this.grupoForm = new FormGroup({

      usuario: new FormControl('', [
        Validators.required,
      ]),
      oficina: new FormControl('', [
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
  createResource() {
    console.log('Creando');

    const arrayValues: PermisoInterface = {
      user_id: this.grupoForm.value.usuario,
      office_id: this.grupoForm.value.oficina,
    };
    console.log(arrayValues);
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.PermisoService.addItem(arrayValues);
    result.then((response) => {
      // console.log(response);
      if (response) {
        this.addFine.emit(response); // Emitiendo evento
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
