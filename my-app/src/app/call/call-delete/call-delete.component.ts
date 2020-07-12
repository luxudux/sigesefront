import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
// SERVICE LLAMADA
import { LlamadaInterface } from '../../services/llamada/llamada-interface';
import { LlamadaService } from '../../services/llamada/llamada.service';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
// EMITIR EVENTO
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-call-delete',
  templateUrl: './call-delete.component.html',
  styleUrls: ['./call-delete.component.css']
})
export class CallDeleteComponent implements OnInit {

  title: string;
  deleteNo: number;
  deleteNota: string;
  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;

  @Output() deleteFine = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // tslint:disable-next-line:no-shadowed-variable
    public LlamadaService: LlamadaService,
    private dialogRef: MatDialogRef<CallDeleteComponent>,
    public dialog: MatDialog,
  ) {
    // console.log(data);
    this.deleteNo = data.id;
    this.deleteNota = data.note;
    this.title = 'Eliminar Registro';
  }

  ngOnInit() {

  }

  deleteResource(numero: number) {
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    console.log('Eliminar' + numero);
    const arrayValues: LlamadaInterface = {
      id: numero,
    };
    const result = this.LlamadaService.deleteItem(arrayValues);
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
