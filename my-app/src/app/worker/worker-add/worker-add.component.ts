import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
// SERVICES
import { ActivoService } from '../../services/activo/activo.service';
import { GeneroService } from '../../services/genero/genero.service';
// INTERFACE AND SERVICE TRABAJADOR
import { TrabajadorInterface } from '../../services/trabajador/trabajador-interface';
import { TrabajadorService } from '../../services/trabajador/trabajador.service';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
// EMITIR EVENTO
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-worker-add',
  templateUrl: './worker-add.component.html',
  styleUrls: ['./worker-add.component.css']
})
export class WorkerAddComponent implements OnInit {

  // VALIDACIONES
  updateNombreMax = 20;
  updateApellidoMax = 20;

  public title: string;
  public grupoForm: FormGroup;
  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;

  // SELECT

  @Output() addFine = new EventEmitter<any>();

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    public TrabajadorService: TrabajadorService,
    // tslint:disable-next-line:no-shadowed-variable
    public ActivoService: ActivoService,
    // tslint:disable-next-line:no-shadowed-variable
    public GeneroService: GeneroService,
    private dialogRef: MatDialogRef<WorkerAddComponent>,
    public dialog: MatDialog,
  ) {
    this.title = 'Nuevo Registro';
  }

  ngOnInit() {

    this.grupoForm = new FormGroup({

      correo: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      nombre: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.updateNombreMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\.]*$'),
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.updateApellidoMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\.]*$'),
      ]),
      genero: new FormControl('', [
        Validators.required,
      ]),
      activo: new FormControl('', [
        Validators.required,
      ]),

    });

  }

  createResource() {
    console.log('Creando');

    const arrayValues: TrabajadorInterface = {
      name: this.grupoForm.value.nombre,
      surname: this.grupoForm.value.apellido,
      mail: this.grupoForm.value.correo,
      sex: this.grupoForm.value.genero,
      active: this.grupoForm.value.activo,
    };
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.TrabajadorService.addItem(arrayValues);
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
