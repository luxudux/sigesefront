import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
// INTERFACE AND SERVICE DELEGACION
import { DelegacionInterface } from '../../services/delegacion/delegacion-interface';
import { DelegacionService } from '../../services/delegacion/delegacion.service';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
// EMITIR EVENTO
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delegation-update',
  templateUrl: './delegation-update.component.html',
  styleUrls: ['./delegation-update.component.css']
})

export class DelegationUpdateComponent implements OnInit {

  // VALIDACIONES
  updateNombreMax = 20;
  updateAcronimoMax = 20;

  public title: string;
  public grupoForm: FormGroup;

  updateNo: number;
  updateNombre: string;
  updateAcronimo: string;

  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;

  @Output() updateFine = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // tslint:disable-next-line:no-shadowed-variable
    public DelegacionService: DelegacionService,
    private dialogRef: MatDialogRef<DelegationUpdateComponent>,
    public dialog: MatDialog,
  ) {
    console.log(data.id);
    this.updateNo = data.id;
    this.updateNombre = data.name;
    this.updateAcronimo = data.acronym;
    this.title = 'Actualizar Registro';
  }
  ngOnInit() {
    this.grupoForm = new FormGroup({

      nombre: new FormControl(this.updateNombre, [
        Validators.required,
        Validators.maxLength(this.updateNombreMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\.]*$'),

      ]),
      acronimo: new FormControl(this.updateAcronimo, [
        Validators.required,
        Validators.maxLength(this.updateAcronimoMax),
        Validators.pattern('^[0-9a-zA-ZñÑ\\s\-]*$'),

      ]),

    });
  }

  updateResource(form: any) {
    console.log('Actualizando');
    // console.log(form);
    const arrayValues: DelegacionInterface = {
      id: this.updateNo,
      name: form.value.nombre,
      acronym: form.value.acronimo,
    };
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.DelegacionService.updateItem(arrayValues);
    // Devuelve una promesa
    result.then((response) => {
      // console.log(response);
      if (response) {
        // console.log('Se eliminó el registro');
        // console.log(response);
        // console.log('Si se pudo eliminar');
        this.updateFine.emit(response); // Emitiendo evento
        this.dialogRef.close(); // Close and refresh
        this.loadingDialogRef.close();
      } else {
        // console.log('No se pudo eliminar');
        // console.error(error);
        this.dialogRef.close(); // Close and refresh
        this.loadingDialogRef.close();
        this.errorDialogRef = this.dialog.open(
          DialogErrorComponent, { disableClose: true });
      }
    });
    // if (result) {
    //   alert('Se actualizó el registro correctamente');
    //   this.dialogRef.close();
    // } else {
    //   alert('No se pudo actualizar el registro');
    // }
    // console.log('ULTIMOS: ');
    // console.log(this.DelegacionService.getItems());
  }

}
