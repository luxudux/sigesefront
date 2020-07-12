import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// CRUD
import { DocumentStateSentComponent } from '../document-state-sent/document-state-sent.component';
// SERVICE AND INTERFACE
import { EnviadoInterface } from '../../../services/documento/enviado/enviado-interface';
import { EnviadoService } from '../../../services/documento/enviado/enviado.service';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-document-to-sent',
  templateUrl: './document-to-sent.component.html',
  styleUrls: ['./document-to-sent.component.css']
})
export class DocumentToSentComponent implements OnInit {

  title: string;
  toNo: number;
  toSubject: string;
  toDelegation: number;
  toState: string;
  // Loading and error
  dataSourceOficinas: EnviadoInterface;
  errorHttp: boolean;
  cargando: boolean;
  loadingDialogRef: any;
  errorDialogRef: any;

  row: any[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // tslint:disable-next-line:no-shadowed-variable
    public EnviadoService: EnviadoService,
    public dialog: MatDialog,
  ) {
    console.log(data);
    this.toNo = data.id;
    this.toSubject = data.subject;
    this.title = 'Documento ' + this.toNo + ' enviado a: ';
  }

  ngOnInit() {
    this.loadingList();
  }

  loadingList() {
    // LOADING DIALOG
    this.cargando = true;
    setTimeout(() => this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true }));
    // OBSERVABLE
    this.EnviadoService.getItemsSendTo(this.toNo).subscribe(
      // CORRECT
      (response) => {
        this.cargando = false;
        /* tslint:disable:no-string-literal */
        this.dataSourceOficinas = response['data'];
        this.loadingDialogRef.close();
      },
      // INCORRECT
      (error) => {
        this.errorHttp = true;
        this.cargando = false;
        console.error(error);
        // Error dialog open and loading close
        this.loadingDialogRef.close();
        setTimeout(() => this.errorDialogRef = this.dialog.open(
          DialogErrorComponent, { disableClose: true }));
      },
      () => { });

  }

  // MODAL: Activity
  openDialogState(row: any[]): void {

    this.row = row;

    const dialogRef = this.dialog.open(DocumentStateSentComponent, {
      // data: { id: this.id, name: this.name, acronym: this.acronym },
      width: '600px',
      data: this.row,
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed update');
    });
  }

}
