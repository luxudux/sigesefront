import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
// CRUD
import { TypeAddComponent } from '../type-add/type-add.component';
import { TypeUpdateComponent } from '../type-update/type-update.component';
import { TypeDeleteComponent } from '../type-delete/type-delete.component';
// INTERFACE AND SERVICE TIPO
import { TipoInterface } from '../../services/tipo/tipo-interface';
import { TipoService } from '../../services/tipo/tipo.service';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../shared/dialog-error/dialog-error.component';
// Configuration
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css']
})
export class TypeListComponent implements OnInit, OnDestroy {

  public title: string;
  // Pagination Options
  public pageSizeOptions: number[];
  public displayedColumns: string[];
  // Display modules
  public showUpdate = false;
  public showAdd = false;
  public showDelete = false;
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<TipoInterface>();
  errorHttp: boolean;
  cargando: boolean;
  loadingDialogRef: any;
  errorDialogRef: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  row: any[];

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    public TipoService: TipoService,
    public dialog: MatDialog,
  ) {
    this.pageSizeOptions = environment.pageSizeOptions;
    this.displayedColumns = ['id', 'name', 'code', 'actions'];
  }
  ngOnInit() {
    this.loadingList();
  }
  public ngOnDestroy(): void {
    console.log('Se destruye el componente');
  }

  loadingList() {
    // LOADING DIALOG
    this.cargando = true;
    setTimeout(() => this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true }));
    // OBSERVABLE
    this.TipoService.getItems().subscribe(
      // CORRECT
      (response) => {
        this.cargando = false;
        /* tslint:disable:no-string-literal */
        this.TipoService.setItems(response['data']);
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
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // MODAL: Add
  openDialogAdd(): void {
    const dialogRef = this.dialog.open(TypeAddComponent, {
      // height: '400px',
      // width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed add');
      // console.log(this.dataSource.data);
      // this.refresh();
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

    const dialogRef = this.dialog.open(TypeUpdateComponent, {
      // data: { id: this.id, name: this.name, code: this.code },
      data: this.row,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed update');
      // this.refresh();
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

    const dialogRef = this.dialog.open(TypeDeleteComponent, {
      // data: { row: this.row },
      data: this.row,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed delete');
      // this.refresh();
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
