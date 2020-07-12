import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
// SERVICES
import { ActivoService } from '../../services/activo/activo.service';
import { GeneroService } from '../../services/genero/genero.service';
// INTERFACE AND SERVICE DELEGACION
import { TrabajadorInterface } from '../../services/trabajador/trabajador-interface';
import { TrabajadorService } from '../../services/trabajador/trabajador.service';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
// EMITIR EVENTO
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-worker-update',
  templateUrl: './worker-update.component.html',
  styleUrls: ['./worker-update.component.css']
})
export class WorkerUpdateComponent implements OnInit {

  // VALIDACIONES
  updateNombreMax = 20;
  updateApellidoMax = 20;

  public title: string;
  public grupoForm: FormGroup;

  updateNo: number;
  updateNombre: string;
  updateApellido: string;
  updateCorreo: number;
  updateGenero: string;
  updateActivo: string;
  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;

  @Output() updateFine = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // tslint:disable-next-line:no-shadowed-variable
    public TrabajadorService: TrabajadorService,
    // tslint:disable-next-line:no-shadowed-variable
    public ActivoService: ActivoService,
    // tslint:disable-next-line:no-shadowed-variable
    public GeneroService: GeneroService,
    private dialogRef: MatDialogRef<WorkerUpdateComponent>,
    public dialog: MatDialog,
  ) {
    // console.log(data.id);
    this.updateNo = data.id;
    this.updateNombre = data.name;
    this.updateApellido = data.surname;
    this.updateCorreo = data.mail;
    this.updateGenero = data.sex;
    this.updateActivo = data.active;
    this.title = 'Actualizar Registro';
  }
  ngOnInit() {

    this.grupoForm = new FormGroup({

      correo: new FormControl(this.updateCorreo, [
        Validators.required,
        Validators.email,
      ]),
      nombre: new FormControl(this.updateNombre, [
        Validators.required,
        Validators.maxLength(this.updateNombreMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\.]*$'),
      ]),
      apellido: new FormControl(this.updateApellido, [
        Validators.required,
        Validators.maxLength(this.updateApellidoMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\.]*$'),
      ]),
      genero: new FormControl(this.updateGenero, [
        Validators.required,
      ]),
      activo: new FormControl(this.updateActivo, [
        Validators.required,
      ]),

    });
  }

  updateResource(form: any) {
    console.log('Actualizando');
    // console.log(form);
    const arrayValues: TrabajadorInterface = {
      id: this.updateNo,
      name: form.value.nombre,
      surname: form.value.apellido,
      mail: form.value.correo,
      sex: form.value.genero,
      active: form.value.activo,
      // office_id: 1, // Valor segun el usuario
    };
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });
    console.log(arrayValues);
    const result = this.TrabajadorService.updateItem(arrayValues);

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
