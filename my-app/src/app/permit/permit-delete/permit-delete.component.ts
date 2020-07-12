import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
// INTERFACE AND SERVICE PERMIT
import { PermisoInterface } from '../../services/permiso/permiso-interface';
import { PermisoService } from '../../services/permiso/permiso.service';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
// EMITIR EVENTO
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-permit-delete',
  templateUrl: './permit-delete.component.html',
  styleUrls: ['./permit-delete.component.css']
})
export class PermitDeleteComponent implements OnInit {

  title: string;
  deleteNo: number;
  deleteOficina: string;
  deleteUsuario: string;
  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;

  @Output() deleteFine = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // tslint:disable-next-line:no-shadowed-variable
    public PermisoService: PermisoService,
    private dialogRef: MatDialogRef<PermitDeleteComponent>,
    public dialog: MatDialog,
  ) {
    this.deleteNo = data.id;
    this.deleteOficina = data.office_name;
    this.deleteUsuario = data.user_name;
    this.title = 'Eliminar Registro';

  }

  ngOnInit() {
  }

  deleteResource(numero: number) {
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    console.log('Eliminar' + numero);
    const arrayValues: PermisoInterface = {
      id: numero,
    };
    const result = this.PermisoService.deleteItem(arrayValues);
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
