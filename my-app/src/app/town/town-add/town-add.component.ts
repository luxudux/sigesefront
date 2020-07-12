import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
// SERVICES
import { ActivoService } from '../../services/activo/activo.service';
// INTERFACE AND SERVICE DELEGACION
import { CiudadInterface } from '../../services/ciudad/ciudad-interface';
import { CiudadService } from '../../services/ciudad/ciudad.service';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
// EMITIR EVENTO
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-town-add',
  templateUrl: './town-add.component.html',
  styleUrls: ['./town-add.component.css']
})
export class TownAddComponent implements OnInit {

  // VALIDACIONES
  updateNombreMax = 60;

  public title: string;
  public grupoForm: FormGroup;
  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;

  @Output() addFine = new EventEmitter<any>();

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    public CiudadService: CiudadService,
    // tslint:disable-next-line:no-shadowed-variable
    public ExtranjeroService: ActivoService,
    private dialogRef: MatDialogRef<TownAddComponent>,
    public dialog: MatDialog,
  ) {
    this.title = 'Nuevo Registro';
  }

  ngOnInit() {

    // VALIDACION
    this.grupoForm = new FormGroup({

      nombre: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.updateNombreMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\.]*$'),
      ]),
      extranjero: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  createResource() {
    console.log('Creando');

    const arrayValues: CiudadInterface = {
      name: this.grupoForm.value.nombre,
      stranger: this.grupoForm.value.extranjero,
    };
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.CiudadService.addItem(arrayValues);
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
