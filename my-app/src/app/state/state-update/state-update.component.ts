import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
// INTERFACE AND SERVICE DELEGACION
import { EstadoInterface } from '../../services/estado/estado-interface';
import { EstadoService } from '../../services/estado/estado.service';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
// EMITIR EVENTO
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-state-update',
  templateUrl: './state-update.component.html',
  styleUrls: ['./state-update.component.css']
})
export class StateUpdateComponent implements OnInit {

  // VALIDACIONES
  updateNombreMax = 20;
  updateIconoMax = 30;
  updateColorMax = 35;

  public title: string;
  public grupoForm: FormGroup;

  updateNo: number;
  updateNombre: string;
  updateIcono: string;
  updateColorIcono: string;
  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;

  @Output() updateFine = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // tslint:disable-next-line:no-shadowed-variable
    public EstadoService: EstadoService,
    private dialogRef: MatDialogRef<StateUpdateComponent>,
    public dialog: MatDialog,
  ) {
    // console.log(data.id);
    // console.log(data);
    this.updateNo = data.id;
    this.updateNombre = data.name;
    this.updateIcono = data.icon;
    this.updateColorIcono = data.color_icon;
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
      icono: new FormControl(this.updateIcono, [
        Validators.required,
        Validators.maxLength(this.updateIconoMax),
        Validators.pattern('^[0-9a-zA-Z\\s\-\.\_]*$'),
      ]),
      color: new FormControl(this.updateColorIcono, [
        Validators.required,
        Validators.maxLength(this.updateColorMax),
        Validators.pattern('^[0-9a-zA-Z\\s\-\.]*$'),
      ]),

    });
  }

  updateResource(form: any) {
    console.log('Actualizando');
    // console.log(form);
    const arrayValues: EstadoInterface = {
      id: this.updateNo,
      name: form.value.nombre,
      icon: form.value.icono,
      color_icon: form.value.color,
    };
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.EstadoService.updateItem(arrayValues);

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
