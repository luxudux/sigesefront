import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
// INTERFACE AND SERVICE PRIORIDAD
import { PrioridadInterface } from '../../services/prioridad/prioridad-interface';
import { PrioridadService } from '../../services/prioridad/prioridad.service';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
// EMITIR EVENTO
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-preference-update',
  templateUrl: './preference-update.component.html',
  styleUrls: ['./preference-update.component.css']
})
export class PreferenceUpdateComponent implements OnInit {

  // VALIDACIONES
  updateNombreMax = 30;
  updateIconoMax = 30;
  updateColorMax = 30;
  updateColorIconoMax = 35;
  updateColorTextoMax = 35;
  updateColorBackMax = 35;

  public title: string;
  public grupoForm: FormGroup;

  updateNo: number;
  updateNombre: string;
  updateIcono: string;
  updateColorIcono: string;
  updateColorTexto: string;
  updateColorBack: string;

  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;

  @Output() updateFine = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // tslint:disable-next-line:no-shadowed-variable
    public PrioridadService: PrioridadService,
    private dialogRef: MatDialogRef<PreferenceUpdateComponent>,
    public dialog: MatDialog,
  ) {
    // console.log(data.id);
    // console.log(data);
    this.updateNo = data.id;
    this.updateNombre = data.name;
    this.updateIcono = data.icon;
    this.updateColorIcono = data.color_icon;
    this.updateColorTexto = data.color_text;
    this.updateColorBack = data.color_back;
    this.title = 'Actualizar Registro';
  }

  ngOnInit() {
    // VALIDACIÓN
    this.grupoForm = new FormGroup({

      nombre: new FormControl(this.updateNombre, [
        Validators.required,
        Validators.maxLength(this.updateNombreMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\.]*$'),
      ]),
      icono: new FormControl(this.updateIcono, [
        Validators.required,
        Validators.maxLength(this.updateIconoMax),
        Validators.pattern('^[0-9a-zA-Z\\s\-\.\_]*$'),
      ]),
      colorIcono: new FormControl(this.updateColorIcono, [
        Validators.required,
        Validators.maxLength(this.updateColorIconoMax),
        Validators.pattern('^[0-9a-zA-Z\\s\-\.\#]*$'),
      ]),
      colorTexto: new FormControl(this.updateColorTexto, [
        Validators.required,
        Validators.maxLength(this.updateColorTextoMax),
        Validators.pattern('^[0-9a-zA-Z\\s\-\.\#]*$'),
      ]),
      colorBack: new FormControl(this.updateColorBack, [
        Validators.required,
        Validators.maxLength(this.updateColorBackMax),
        Validators.pattern('^[0-9a-zA-Z\\s\-\.\#]*$'),
      ]),

    });
  }

  updateResource(form: any) {
    console.log('Actualizando');
    // console.log(form);
    const arrayValues: PrioridadInterface = {
      id: this.updateNo,
      name: form.value.nombre,
      icon: this.grupoForm.value.icono,
      color_icon: this.grupoForm.value.colorIcono,
      color_text: this.grupoForm.value.colorTexto,
      color_back: this.grupoForm.value.colorBack,
    };
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.PrioridadService.updateItem(arrayValues);
    // Devuelve una promesa
    result.then((response) => {
      // console.log(response);
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
