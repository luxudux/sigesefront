import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
// SERVICES
import { ActivoService } from '../../services/activo/activo.service';
import { NivelService } from '../../services/nivel/nivel.service';
// INTERFACE AND SERVICE USUARIO
import { UsuarioInterface } from '../../services/usuario/usuario-interface';
import { UsuarioService } from '../../services/usuario/usuario.service';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
// EMITIR EVENTO
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  // VALIDACIONES
  updateNombreMax = 20;
  updateClaveMax = 30;
  updaterClaveMax = 30;

  public title: string;
  public grupoForm: FormGroup;

  updateNo: number;
  updateNombre: string;
  updateActivo: string;
  updateNivel: number;
  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;

  // SELECT
  selectNiveles: Array<any>;

  @Output() updateFine = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // tslint:disable-next-line:no-shadowed-variable
    public UsuarioService: UsuarioService,
    // tslint:disable-next-line:no-shadowed-variable
    public ActivoService: ActivoService,
    // tslint:disable-next-line:no-shadowed-variable
    public NivelService: NivelService,
    // tslint:disable-next-line:no-shadowed-variable
    private dialogRef: MatDialogRef<UserUpdateComponent>,
    public dialog: MatDialog,
  ) {
    // console.log(data.id);
    this.updateNo = data.id;
    this.updateNombre = data.name;
    this.updateActivo = data.active;
    this.updateNivel = data.level_id;

    this.title = 'Actualizar Registro';
  }
  ngOnInit() {

    this.grupoForm = new FormGroup({

      nombre: new FormControl(this.updateNombre, [
        Validators.required,
        Validators.maxLength(this.updateNombreMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-]*$'),
      ]),
      clave: new FormControl('' , [
        Validators.required,
        Validators.maxLength(this.updateClaveMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-]*$'),
      ]),
      rclave: new FormControl('', [
        Validators.required,
      ]),
      activo: new FormControl(this.updateActivo, [
        Validators.required,
      ]),
      nivel: new FormControl(+this.updateNivel, [
        Validators.required,
      ]),

    });

    // GET DATA SELECT
    this.getNiveles();

  }

  getNiveles() {
    const result = this.NivelService.getItems();
    // console.log(result);
    result.toPromise()
      .then((response: any) => {
        this.selectNiveles = response.data;
        console.log(response.data);
      })
      .catch(error => console.log('Error', error));
  }

  updateResource(form: any) {
    console.log('Actualizando');
    // console.log(form);
    const arrayValues: UsuarioInterface = {
      id: this.updateNo,
      name: form.value.nombre,
      password: form.value.clave,
      active: form.value.activo,
      level_id: form.value.nivel,
      worker_id: form.value.trabajador,
    };
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.UsuarioService.updateItem(arrayValues);

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
