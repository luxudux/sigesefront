import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
// SERVICE DELEGACION
import { TipoInterface } from '../../services/tipo/tipo-interface';
import { TipoService } from '../../services/tipo/tipo.service';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
// EMITIR EVENTO
import {Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-type-delete',
  templateUrl: './type-delete.component.html',
  styleUrls: ['./type-delete.component.css']
})
export class TypeDeleteComponent implements OnInit {

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
    public TipoService: TipoService,
    private dialogRef: MatDialogRef<TypeDeleteComponent>,
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
    const arrayValues: TipoInterface = {
      id: numero,
    };
    const result = this.TipoService.deleteItem(arrayValues);
    // Devuelve una promesa
    result.then((response) => {
      // console.log(response);
      if (response) {
        this.deleteFine.emit(response); // Emitiendo evento
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
