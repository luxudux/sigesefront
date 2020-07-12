import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
// INTERFACE AND SERVICE DELEGACION
import { TipoInterface } from '../../services/tipo/tipo-interface';
import { TipoService } from '../../services/tipo/tipo.service';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
// EMITIR EVENTO
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-type-update',
  templateUrl: './type-update.component.html',
  styleUrls: ['./type-update.component.css']
})
export class TypeUpdateComponent implements OnInit {

  // VALIDACIONES
  updateNombreMax = 20;
  updateCodigoMax = 20;

  public title: string;
  public grupoForm: FormGroup;

  updateNo: number;
  updateNombre: string;
  updateCodigo: string;

  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;

  @Output() updateFine = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // tslint:disable-next-line:no-shadowed-variable
    public TipoService: TipoService,
    private dialogRef: MatDialogRef<TypeUpdateComponent>,
    public dialog: MatDialog,
  ) {
    console.log(data.id);
    this.updateNo = data.id;
    this.updateNombre = data.name;
    this.updateCodigo = data.code;
    this.title = 'Actualizar Registro';
  }
  ngOnInit() {
    this.grupoForm = new FormGroup({

      nombre: new FormControl(this.updateNombre, [
        Validators.required,
        Validators.maxLength(this.updateNombreMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\.]*$'),

      ]),
      codigo: new FormControl(this.updateCodigo, [
        Validators.required,
        Validators.maxLength(this.updateCodigoMax),
        Validators.pattern('^[0-9a-zA-ZñÑ\\s\-]*$'),

      ]),

    });
  }

  updateResource(form: any) {
    console.log('Actualizando');
    // console.log(form);
    const arrayValues: TipoInterface = {
      id: this.updateNo,
      name: form.value.nombre,
      code: form.value.codigo,
    };
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.TipoService.updateItem(arrayValues);
    // Devuelve una promesa
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
