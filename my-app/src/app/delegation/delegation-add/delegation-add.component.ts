import { Component, OnInit } from '@angular/core';
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
  selector: 'app-delegation-add',
  templateUrl: './delegation-add.component.html',
  styleUrls: ['./delegation-add.component.css']
})
export class DelegationAddComponent implements OnInit {

  // VALIDACIONES
  updateNombreMax = 20;
  updateAcronimoMax = 20;

  public title: string;
  public grupoForm: FormGroup;
  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;

  @Output() addFine = new EventEmitter<any>();

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    public DelegacionService: DelegacionService,
    private dialogRef: MatDialogRef<DelegationAddComponent>,
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
      acronimo: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.updateAcronimoMax),
        Validators.pattern('^[0-9a-zA-ZñÑ\\s\-]*$'),

      ]),

    });
  }

  createResource() {
    console.log('Creando');
    // const arrayValues: DelegacionInterface;
    const arrayValues: DelegacionInterface = {
      name: this.grupoForm.value.nombre,
      acronym: this.grupoForm.value.acronimo,
    };
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });
    // console.log('Agregar' + arrayValues);
    const result = this.DelegacionService.addItem(arrayValues);
    // console.log('Agregar nuevo registro');
    // console.log(result);
    // Devuelve una promesa
    result.then((response) => {
      // console.log(response);
      if (response) {
        // console.log('Se eliminó el registro');
        // console.log(response);
        // console.log('Si se pudo eliminar');
        this.addFine.emit(response); // Emitiendo evento
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
  }

}
