import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// SERVICE AND INTERFACE
import { EnviadoInterface } from '../../../services/documento/enviado/enviado-interface';
import { EnviadoService } from '../../../services/documento/enviado/enviado.service';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-document-state-sent',
  templateUrl: './document-state-sent.component.html',
  styleUrls: ['./document-state-sent.component.css']
})
export class DocumentStateSentComponent implements OnInit {

  title: string;
  itemNo: number;
  itemStateId: number;
  itemState: string;
  // Loading and error
  dataSourceStates: EnviadoInterface;
  errorHttp: boolean;
  cargando: boolean;
  loadingDialogRef: any;
  errorDialogRef: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // tslint:disable-next-line:no-shadowed-variable
    public EnviadoService: EnviadoService,
    public dialog: MatDialog,
  ) {
    console.log(data);
    this.title = 'Copia No.' + data.id;
    this.itemNo = data.id;
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
    this.EnviadoService.getItemsSendState(this.itemNo).subscribe(
      // CORRECT
      (response) => {
        this.cargando = false;
        /* tslint:disable:no-string-literal */
        this.dataSourceStates = response['data'];
        console.log(response['data']);
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

}
