import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
// CRUD
import { CallAddComponent } from '../call-add/call-add.component';
import { CallUpdateComponent } from '../call-update/call-update.component';
import { CallDeleteComponent } from '../call-delete/call-delete.component';
// INTERFACE AND SERVICE LLAMADA
import { LlamadaInterface } from '../../services/llamada/llamada-interface';
import { LlamadaService } from '../../services/llamada/llamada.service';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../shared/dialog-error/dialog-error.component';
// Configuration
import { environment } from '../../../environments/environment';
// MOMENT
import * as moment from 'moment';

@Component({
  selector: 'app-call-list',
  templateUrl: './call-list.component.html',
  styleUrls: ['./call-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('80ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CallListComponent implements OnInit {

  // Pagination Options
  public pageSizeOptions: number[];
  public displayedColumns: string[];
  // Display modules
  public showUpdate = false;
  public showAdd = false;
  public showDelete = false;
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<LlamadaInterface>();
  errorHttp: boolean;
  cargando: boolean;
  loadingDialogRef: any;
  errorDialogRef: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  row: any[];

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    public LlamadaService: LlamadaService,
    public dialog: MatDialog
  ) {
    this.pageSizeOptions = environment.pageSizeOptions;
    this.displayedColumns = ['id', 'name', 'day', 'ago', 'user_name', 'actions'];
  }
  // CALLED
  getDiferenceNow(start: string) {
    const dateInicio = moment(start, 'YYYY/MM/DD HH:mm');
    const duration = moment(dateInicio).fromNow();
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
    this.LlamadaService.getItems().subscribe(
      // CORRECT
      (response) => {
        this.cargando = false;
        /* tslint:disable:no-string-literal */
        this.LlamadaService.setItems(response['data']);
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
    // this.dataSource = new MatTableDataSource<LlamadaInterface>(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // MODAL: Add
  openDialogAdd(): void {
    const dialogRef = this.dialog.open(CallAddComponent, {
      // height: '400px',
      // width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed add');
      emitAdd.unsubscribe();
    });
    // Emitiendo el evento desde elemento modal cuando se agregue bien el registro
    const emitAdd = dialogRef.componentInstance.addFine.subscribe(
      (data) => {
        this.loadingList(); // Recargar registros desde el servicio
        console.log('Se emitió que el componente hijo agregó bien el registro: ');
        console.log(data);
      });
  }
  // MODAL: Update
  openDialogUpdate(row: any[]): void {

    this.row = row;

    const dialogRef = this.dialog.open(CallUpdateComponent, {
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

    const dialogRef = this.dialog.open(CallDeleteComponent, {
      // data: { row: this.row },
      data: this.row,
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed delete');
      emitDelete.unsubscribe();
    });
    // Emitiendo el evento desde elemento modal cuando se elimine bien el registro
    const emitDelete = dialogRef.componentInstance.deleteFine.subscribe(
      (data) => {
        this.loadingList(); // Recargar registros desde el servicio
        console.log('Se emitió que el componente hijo eliminó bien el registro: ');
        console.log(data);
      });
  }

}
