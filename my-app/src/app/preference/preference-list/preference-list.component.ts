import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
// CRUD
import { PreferenceAddComponent } from '../preference-add/preference-add.component';
import { PreferenceUpdateComponent } from '../preference-update/preference-update.component';
import { PreferenceDeleteComponent } from '../preference-delete/preference-delete.component';
// INTERFACE AND SERVICE DELEGACION
import { PrioridadInterface } from '../../services/prioridad/prioridad-interface';
import { PrioridadService } from '../../services/prioridad/prioridad.service';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../shared/dialog-error/dialog-error.component';
// Configuration
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-preference-list',
  templateUrl: './preference-list.component.html',
  styleUrls: ['./preference-list.component.css']
})
export class PreferenceListComponent implements OnInit {

  public title = 'Componente Delegación';
  // Pagination Options
  public pageSizeOptions: number[];
  public displayedColumns: string[];

  // Display modules
  public showUpdate = false;
  public showAdd = false;
  public showDelete = false;

  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<PrioridadInterface>();
  errorHttp: boolean;
  cargando: boolean;
  loadingDialogRef: any;
  errorDialogRef: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  row: any[];

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    public PrioridadService: PrioridadService,
    public dialog: MatDialog) {

    this.pageSizeOptions = environment.pageSizeOptions;
    this.displayedColumns = ['id', 'name', 'icon', 'color_icon', 'color_text', 'color_back', 'actions'];
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
    this.PrioridadService.getItems().subscribe(
      // CORRECT
      (response) => {
        this.cargando = false;
        /* tslint:disable:no-string-literal */
        this.PrioridadService.setItems(response['data']);
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
    // this.dataSource = new MatTableDataSource<PrioridadInterface>(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // MODAL: Add
  openDialogAdd(): void {
    const dialogRef = this.dialog.open(PreferenceAddComponent, {
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

    const dialogRef = this.dialog.open(PreferenceUpdateComponent, {
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

    const dialogRef = this.dialog.open(PreferenceDeleteComponent, {
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
