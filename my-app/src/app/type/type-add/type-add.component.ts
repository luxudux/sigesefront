import { Component, OnInit } from '@angular/core';
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
  selector: 'app-type-add',
  templateUrl: './type-add.component.html',
  styleUrls: ['./type-add.component.css']
})
export class TypeAddComponent implements OnInit {

  // VALIDACIONES
  updateNombreMax = 20;
  updateCodigoMax = 20;

  public title: string;
  public grupoForm: FormGroup;
  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;

  @Output() addFine = new EventEmitter<any>();

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    public TipoService: TipoService,
    private dialogRef: MatDialogRef<TypeAddComponent>,
    public dialog: MatDialog,
  ) {
    this.title = 'Nuevo Registro';
  }

  ngOnInit() {

    this.grupoForm = new FormGroup({

      nombre: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.updateNombreMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\.]*$'),

      ]),
      codigo: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.updateCodigoMax),
        Validators.pattern('^[0-9a-zA-ZñÑ\\s\-]*$'),

      ]),

    });
  }

  createResource() {
    console.log('Creando');
    // const arrayValues: TipoInterface;
    const arrayValues: TipoInterface = {
      name: this.grupoForm.value.nombre,
      code: this.grupoForm.value.codigo,
    };
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.TipoService.addItem(arrayValues);
    // Devuelve una promesa
    result.then((response) => {
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
