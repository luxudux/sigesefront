import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
// SERVICE CONCLUSION
import { ConclusionInterface } from '../../services/conclusion/conclusion-interface';
import { ConclusionService } from '../../services/conclusion/conclusion.service';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
// EMITIR EVENTO
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-conclution-delete',
  templateUrl: './conclution-delete.component.html',
  styleUrls: ['./conclution-delete.component.css']
})
export class ConclutionDeleteComponent implements OnInit {

  title: string;
  deleteNo: number;
  deleteNombre: string;
  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;

  @Output() deleteFine = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // tslint:disable-next-line:no-shadowed-variable
    public ConclusionService: ConclusionService,
    private dialogRef: MatDialogRef<ConclutionDeleteComponent>,
    public dialog: MatDialog,
  ) {
    // console.log(data);
    this.deleteNo = data.id;
    this.deleteNombre = data.name;
    this.title = 'Eliminar Registro';
  }

  ngOnInit() {

  }

  deleteResource(numero: number) {
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    console.log('Eliminar' + numero);
    const arrayValues: ConclusionInterface = {
      id: numero,
    };
    const result = this.ConclusionService.deleteItem(arrayValues);
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
