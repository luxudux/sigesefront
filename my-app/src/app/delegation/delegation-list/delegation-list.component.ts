import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { merge, Observable, of as observableOf, isObservable } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

// CRUD
import { DelegationAddComponent } from '../delegation-add/delegation-add.component';
import { DelegationUpdateComponent } from '../delegation-update/delegation-update.component';
import { DelegationDeleteComponent } from '../delegation-delete/delegation-delete.component';
// INTERFACE AND SERVICE DELEGACION
import { DelegacionInterface } from '../../services/delegacion/delegacion-interface';
import { DelegacionService } from '../../services/delegacion/delegacion.service';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../shared/dialog-error/dialog-error.component';
// Configuration
import { environment } from '../../../environments/environment';

// const ELEMENT_DATA: DelegacionInterface[] = [
//   { id: 1, name: 'Hydrogen', acronym: 'H' },
//   { id: 2, name: 'Helium', acronym: 'He' },
//   { id: 3, name: 'Lithium', acronym: 'Li' },
//   { id: 4, name: 'Beryllium', acronym: 'Be' },
//   { id: 5, name: 'Boron', acronym: 'B' },
//   { id: 6, name: 'Carbon', acronym: 'C' },
//   { id: 7, name: 'Nitrogen', acronym: 'N' },
//   { id: 8, name: 'Oxygen', acronym: 'O' },
//   { id: 9, name: 'Fluorine', acronym: 'F' },
//   { id: 10, name: '1Neon', acronym: 'Ne' },
//   { id: 11, name: '1Hydrogen', acronym: 'H' },
//   { id: 12, name: '1Helium', acronym: 'He' },
//   { id: 13, name: '1Lithium', acronym: 'Li' },
//   { id: 14, name: '2Beryllium', acronym: 'Be' },
//   { id: 15, name: '2Boron', acronym: 'B' },
//   { id: 16, name: '2Carbon', acronym: 'C' },
//   { id: 17, name: '2Nitrogen', acronym: 'N' },
//   { id: 18, name: '3Oxygen', acronym: 'O' },
//   { id: 19, name: '3Fluorine', acronym: 'F' },
//   { id: 20, name: '3Neon', acronym: 'Ne' },
// ];

@Component({
  selector: 'app-delegation-list',
  templateUrl: './delegation-list.component.html',
  styleUrls: ['./delegation-list.component.css']
})
export class DelegationListComponent implements OnInit, OnDestroy {

  public title: string;
  // Pagination Options
  public pageSizeOptions: number[];
  public displayedColumns: string[];
  // Display modules
  public showUpdate = false;
  public showAdd = false;
  public showDelete = false;
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<DelegacionInterface>();
  errorHttp: boolean;
  cargando: boolean;
  loadingDialogRef: any;
  errorDialogRef: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  row: any[];

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    public DelegacionService: DelegacionService,
    public dialog: MatDialog,
  ) {
    // this.title = 'Componente Delegación';
    // this.pageSizeOptions = [5, 10, 20, 30];
    this.pageSizeOptions = environment.pageSizeOptions;
    this.displayedColumns = ['id', 'name', 'acronym', 'actions'];
  }
  ngOnInit() {

    // this.cargando = true;
    // // Loading dialog
    // setTimeout(() => this.loadingDialogRef = this.dialog.open(
    //   DialogLoadingComponent, { panelClass: 'transparent', disableClose: true }));
    this.loadingList();
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

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
    this.DelegacionService.getItems().subscribe(
      // CORRECT
      (response) => {
        this.cargando = false;
        /* tslint:disable:no-string-literal */
        // console.log(response['data']);
        this.DelegacionService.setItems(response['data']);
        // this.dataSource = new MatTableDataSource<DelegacionInterface>(response['data']);
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
      () => {
        // console.log('Se completó la llamada');
        // console.log(this.dataSource);
      });


    // PROMESA
    // this.DelegacionService.pruebaItems()
    //   .toPromise()
    //   .then((results: any) => {
    //      this.cargando = false;
    //     console.log(results.data);
    //     // Loading data from API-REST in the service
    //     this.DelegacionService.loadItems(results.data);
    //     console.log(this.DelegacionService.getItems());
    //     // Loading data from service in the dataSource Table
    //     // this.dataSource = new MatTableDataSource<DelegacionInterface>(this.DelegacionService.getItems());
    //     // this.dataSource = new MatTableDataSource<DelegacionInterface>(results.data);
    //     // this.dataSource = new MatTableDataSource(results.data);
    //     this.dataSource = new MatTableDataSource(this.DelegacionService.getItems());
    //     this.dataSource.sort = this.sort;
    //     this.dataSource.paginator = this.paginator;
    //     // console.log(this.dataSource.data);
    //   })
    //   .catch(error => console.log('Error', error); this.errorHttp = true;);


  }
  // Input Filter
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  // Refresh data in Table and paginator
  refresh() {
    // this.dataSource = new MatTableDataSource<DelegacionInterface>(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // MODAL: Add
  openDialogAdd(): void {
    const dialogRef = this.dialog.open(DelegationAddComponent, {
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

    const dialogRef = this.dialog.open(DelegationUpdateComponent, {
      // data: { id: this.id, name: this.name, acronym: this.acronym },
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

    const dialogRef = this.dialog.open(DelegationDeleteComponent, {
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
