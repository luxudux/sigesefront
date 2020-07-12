import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
// INTERFACE AND SERVICE PRIORIDADES
import { PrioridadInterface } from '../../services/prioridad/prioridad-interface';
import { PrioridadService } from '../../services/prioridad/prioridad.service';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
// EMITIR EVENTO
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-preference-add',
  templateUrl: './preference-add.component.html',
  styleUrls: ['./preference-add.component.css']
})
export class PreferenceAddComponent implements OnInit {

  // VALIDACIONES
  updateNombreMax = 20;
  updateIconoMax = 20;
  updateColorMax = 20;
  updateColorIconoMax = 35;
  updateColorTextoMax = 35;
  updateColorBackMax = 35;

  public title: string;
  public grupoForm: FormGroup;
  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;

  @Output() addFine = new EventEmitter<any>();

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    public PrioridadService: PrioridadService,
    private dialogRef: MatDialogRef<PreferenceAddComponent>,
    public dialog: MatDialog,
  ) {
    this.title = 'Nuevo Registro';
  }

  ngOnInit() {

    // VALIDACIÓN
    this.grupoForm = new FormGroup({

      nombre: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.updateNombreMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\.]*$'),
      ]),
      icono: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.updateIconoMax),
        Validators.pattern('^[0-9a-zA-Z\\s\-\.\_]*$'),
      ]),
      colorIcono: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.updateColorIconoMax),
        Validators.pattern('^[0-9a-zA-Z\\s\-\.\#]*$'),
      ]),
      colorTexto: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.updateColorTextoMax),
        Validators.pattern('^[0-9a-zA-Z\\s\-\.\#]*$'),
      ]),
      colorBack: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.updateColorBackMax),
        Validators.pattern('^[0-9a-zA-Z\\s\-\.\#]*$'),
      ]),

    });
  }
  createResource() {
    console.log('Creando');

    const arrayValues: PrioridadInterface = {
      name: this.grupoForm.value.nombre,
      icon: this.grupoForm.value.icono,
      color_icon: this.grupoForm.value.colorIcono,
      color_text: this.grupoForm.value.colorTexto,
      color_back: this.grupoForm.value.colorBack,
    };
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.PrioridadService.addItem(arrayValues);

    // Devuelve una promesa
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
