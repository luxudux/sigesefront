import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
// CRUD
import { DocumentOpenComponent } from '../../received/document-open/document-open.component';
import { DocumentAddComponent } from '../document-add/document-add.component';
import { DocumentUpdateComponent } from '../document-update/document-update.component';
import { DocumentDeleteComponent } from '../document-delete/document-delete.component';
import { DocumentSentComponent } from '../document-sent/document-sent.component';
import { DocumentFileComponent } from '../document-file/document-file.component';
// INTERFACE AND SERVICE DOCUMENTO
import { DocumentoInterface } from '../../../services/documento/documento-interface';
import { ElaboradoService } from '../../../services/documento/elaborado/elaborado.service';
// MOMENT
import * as moment from 'moment';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../../shared/dialog-error/dialog-error.component';
// Configuration
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-document-list-elaborated',
  templateUrl: './document-list-elaborated.component.html',
  styleUrls: ['./document-list-elaborated.component.css']
})
export class DocumentListElaboratedComponent implements OnInit {

  // Pagination Options
  public pageSizeOptions: number[];
  public displayedColumns: string[];
  // Display modules
  public showUpdate = false;
  public showAdd = false;
  public showDelete = false;

  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<DocumentoInterface>();
  errorHttp: boolean;
  cargando: boolean;
  loadingDialogRef: any;
  errorDialogRef: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  row: any[];

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    public ElaboradoService: ElaboradoService,
    public dialog: MatDialog
  ) {
    this.pageSizeOptions = environment.pageSizeOptions;
    this.displayedColumns = ['id', 'control', 'subject', 'expiration', 'expiresIn', 'type_name', 'url', 'actions'];
  }
  // EXPIRES IN
  getDiferenceNow(expires: string) {
    // const ahora = moment();
    const dateInicio = moment(expires, 'YYYY/MM/DD HH:mm');
    // const duration = moment.duration(dateInicio.diff(ahora));
    // const diferencia = dateInicio.diff(ahora);
    const duration = moment(dateInicio).fromNow();
    // // return moment(dateInicio).fromNow();
    // const duration = moment.duration(diferencia);
    // if (duration.hours() === 0) {
    //   return 'fué hace ' + Math.abs(duration.minutes()) + ' Min.';
    // } else if (duration.minutes() < 0) {
    //   return 'fué hace ' + Math.abs(duration.days()) + ' Días.';
    // } else {
    //   return 'en ' + duration.hours() + ':' + duration.minutes() + ' Hrs.';
    // }
    return duration;
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
    this.ElaboradoService.getItems().subscribe(
      // CORRECT
      (response) => {
        this.cargando = false;
        /* tslint:disable:no-string-literal */
        this.ElaboradoService.setItems(response['data']);
        this.dataSource = new MatTableDataSource(response['data']);
        /* tslint:enable:no-string-literal */
        this.refresh();
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
  // Input Filter
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // Refresh data in Table and paginator
  refresh() {
    // this.dataSource = new MatTableDataSource<DocumentoInterface>(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // MODAL: Add
  openDialogAdd(): void {
    const dialogRef = this.dialog.open(DocumentAddComponent, {
      // height: '400px',
      // width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed add');
      emitAdd.unsubscribe();
    });
    // Emitiendo el evento desde elemento modal cuando se actualiza bien el registro
    const emitAdd = dialogRef.componentInstance.addFine.subscribe(
      (data) => {
        this.loadingList(); // Recargar registros desde el servicio
        console.log('Se emitió que el componente hijo actualizó bien el registro: ');
        console.log(data);
      });
  }
  // MODAL: Update
  openDialogUpdate(row: any[]): void {

    this.row = row;

    const dialogRef = this.dialog.open(DocumentUpdateComponent, {
      // data: { id: this.id, name: this.name, acronym: this.acronym },
      data: this.row,
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed update');
      emitUpdate.unsubscribe();
    });
    // Emitiendo el evento desde elemento modal cuando se actualiza bien el registro
    const emitUpdate = dialogRef.componentInstance.updateFine.subscribe(
      (data) => {
        this.loadingList(); // Recargar registros desde el servicio
        console.log('Se emitió que el componente hijo actualizó bien el registro: ');
        console.log(data);
      });
  }
  // MODAL: Delete
  openDialogDelete(row: any[]): void {
    this.row = row;

    const dialogRef = this.dialog.open(DocumentDeleteComponent, {
      // data: { row: this.row },
      data: this.row,
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed delete');
      emitDelete.unsubscribe();
    });
    // Emitiendo el evento desde elemento modal cuando se actualiza bien el registro
    const emitDelete = dialogRef.componentInstance.deleteFine.subscribe(
      (data) => {
        this.loadingList(); // Recargar registros desde el servicio
        console.log('Se emitió que el componente hijo actualizó bien el registro: ');
        console.log(data);
      });
  }
  // MODAL: Open
  openDialogOpen(row: any[]): void {

    this.row = row;

    const dialogRef = this.dialog.open(DocumentOpenComponent, {
      // data: { id: this.id, name: this.name, acronym: this.acronym },
      data: this.row,
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed update');
    });
  }
  // MODAL: Sent
  openDialogSent(row: any[]): void {

    this.row = row;

    const dialogRef = this.dialog.open(DocumentSentComponent, {
      // data: { id: this.id, name: this.name, acronym: this.acronym },
      data: this.row,
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed sent');
      emitSent.unsubscribe();
    });
    // Emitiendo el evento desde elemento modal cuando se actualiza bien el registro
    const emitSent = dialogRef.componentInstance.sentFine.subscribe(
      (data) => {
        this.loadingList(); // Recargar registros desde el servicio
        console.log('Se emitió que el componente hijo envió bien el registro: ');
        console.log(data);
      });
  }
  // MODAL: File
  openDialogFile(row: any[]): void {

    // this.row = row;

    // const dialogRef = this.dialog.open(DocumentFileComponent, {
    //   // data: { id: this.id, name: this.name, acronym: this.acronym },
    //   data: this.row,
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   // console.log('The dialog was closed file');
    //   emitFile.unsubscribe();
    // });
    // // Emitiendo el evento desde elemento modal cuando se actualiza bien el registro
    // const emitFile = dialogRef.componentInstance.fileFine.subscribe(
    //   (data) => {
    //     this.loadingList(); // Recargar registros desde el servicio
    //     console.log('Se emitió que el componente hijo actualizó bien el registro: ');
    //     console.log(data);
    //   });
  }

}
