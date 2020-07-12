import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
// SERVICE DELEGACION
import { DelegacionInterface } from '../../services/delegacion/delegacion-interface';
import { DelegacionService } from '../../services/delegacion/delegacion.service';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
// EMITIR EVENTO
import {Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-delegation-delete',
  templateUrl: './delegation-delete.component.html',
  styleUrls: ['./delegation-delete.component.css']
})
export class DelegationDeleteComponent implements OnInit {

  title: string;
  deleteNo: number;
  deleteNombre: string;
  deleteAcronimo: string;
  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;

  @Output() deleteFine = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // tslint:disable-next-line:no-shadowed-variable
    public DelegacionService: DelegacionService,
    private dialogRef: MatDialogRef<DelegationDeleteComponent>,
    public dialog: MatDialog,
  ) {
    // console.log(data);
    this.deleteNo = data.id;
    this.deleteNombre = data.name;
    this.deleteAcronimo = data.acronym;
    this.title = 'Eliminar Registro';
  }

  ngOnInit() {

  }

  deleteResource(numero: number) {
    // this.dialogRef.close();
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    console.log('Eliminar' + numero);
    const arrayValues: DelegacionInterface = {
      id: numero,
    };
    const result = this.DelegacionService.deleteItem(arrayValues);
    // console.log(result);
    // Devuelve una promesa
    result.then((response) => {
      // console.log(response);
      if (response) {
        // console.log('Se eliminó el registro');
        // console.log(response);
        // console.log('Si se pudo eliminar');
        this.deleteFine.emit(response); // Emitiendo evento
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
