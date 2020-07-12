import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  selector: 'app-town-update',
  templateUrl: './town-update.component.html',
  styleUrls: ['./town-update.component.css']
})
export class TownUpdateComponent implements OnInit {

  // VALIDACIONES
  updateNombreMax = 60;

  public title: string;
  public grupoForm: FormGroup;

  updateNo: number;
  updateNombre: string;
  updateExtranjero: string;
  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;

  @Output() updateFine = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // tslint:disable-next-line:no-shadowed-variable
    public CiudadService: CiudadService,
    // tslint:disable-next-line:no-shadowed-variable
    public ExtranjeroService: ActivoService,
    private dialogRef: MatDialogRef<TownUpdateComponent>,
    public dialog: MatDialog,
  ) {
    console.log(data.id);
    console.log(data);
    this.updateNo = data.id;
    this.updateNombre = data.name;
    this.updateExtranjero = data.stranger;
    this.title = 'Actualizar Registro';
  }

  ngOnInit() {

    // VALIDACION
    this.grupoForm = new FormGroup({

      nombre: new FormControl(this.updateNombre, [
        Validators.required,
        Validators.maxLength(this.updateNombreMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\.]*$'),
      ]),
      extranjero: new FormControl(this.updateExtranjero, [
        Validators.required,
      ]),
    });
  }
  updateResource(form: any) {
    console.log('Actualizando');
    // console.log(form);
    const arrayValues: CiudadInterface = {
      id: this.updateNo,
      name: form.value.nombre,
      stranger: form.value.extranjero,
    };
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.CiudadService.updateItem(arrayValues);

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
