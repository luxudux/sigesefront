import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
// CRUD
import { EventAddComponent } from '../event-add/event-add.component';
import { EventUpdateComponent } from '../event-update/event-update.component';
import { EventDeleteComponent } from '../event-delete/event-delete.component';
// INTERFACE AND SERVICE DELEGACION
import { EventoInterface } from '../../services/evento/evento-interface';
import { EventoService } from '../../services/evento/evento.service';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../shared/dialog-error/dialog-error.component';
// Configuration
import { environment } from '../../../environments/environment';
// MOMENT
import * as moment from 'moment';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('80ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EventListComponent implements OnInit {

  // Pagination Options
  public pageSizeOptions: number[];
  public displayedColumns: string[];
  // Display modules
  public showUpdate = false;
  public showAdd = false;
  public showDelete = false;
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<EventoInterface>();
  errorHttp: boolean;
  cargando: boolean;
  loadingDialogRef: any;
  errorDialogRef: any;

  // Date
  // public fechaHoy = moment(new Date());

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  row: any[];

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    public EventoService: EventoService,
    public dialog: MatDialog
  ) {
    this.pageSizeOptions = environment.pageSizeOptions;
    this.displayedColumns = ['id', 'title', 'start', 'end', 'duration', 'startIn',
     'preference_name', 'actions'];
  }
  // DURATION
  getDiference(start: string, end: string) {

    const dateInicio = moment(start, 'YYYY/MM/DD HH:mm');
    const dateFinal = moment(end, 'YYYY/MM/DD HH:mm');
    const diferencia = dateFinal.diff(dateInicio);
    const duration = moment.duration(diferencia);
    if (duration.hours() < 0) {
      return '';
    } else if (duration.hours() === 0) {
      return duration.minutes() + ' Min.';
    } else if (duration.hours() === 1) {
      return duration.hours() + ' Hr.';
    } else if (duration.days() > 0) {
      return Math.abs(duration.days()) + ' Días.';
    } else {
      return duration.hours() + ' Hrs.';
    }
  }
  // START IN
  getDiferenceNow(start: string) {
    // const ahora = moment();
    const dateInicio = moment(start, 'YYYY/MM/DD HH:mm');
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
    this.EventoService.getItems().subscribe(
      // CORRECT
      (response) => {
        this.cargando = false;
        /* tslint:disable:no-string-literal */
        this.EventoService.setItems(response['data']);
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
    // this.dataSource = new MatTableDataSource<EventoInterface>(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // MODAL: Add
  openDialogAdd(): void {
    const dialogRef = this.dialog.open(EventAddComponent, {
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

    const dialogRef = this.dialog.open(EventUpdateComponent, {
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

    const dialogRef = this.dialog.open(EventDeleteComponent, {
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
