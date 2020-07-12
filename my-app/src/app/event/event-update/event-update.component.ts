import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
// INTERFACE AND SERVICE EVENTO
import { EventoInterface } from '../../services/evento/evento-interface';
import { EventoService } from '../../services/evento/evento.service';
// SERVICES
import { PrioridadService } from '../../services/prioridad/prioridad.service';
// MOMENT
import * as moment from 'moment';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
// EMITIR EVENTO
import { Output, EventEmitter } from '@angular/core';
// Configuration
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.component.html',
  styleUrls: ['./event-update.component.css']
})
export class EventUpdateComponent implements OnInit {

  // VALIDACIONES
  updateTituloMax = 30;
  updateDescripcionMax = 150;
  updateInicioMax = 10;
  updateInicioMin = 9;
  updateFinalMax = 10;
  updateFinalMin = 9;
  updateInicioHoraMax = 5;
  updateInicioHoraMin = 5;
  updateFinalHoraMax = 5;
  updateFinalHoraMin = 5;

  public title: string;
  public grupoForm: FormGroup;

  updateNo: number;
  updateTitulo: string;
  updateDescripcion: string;
  updatePrioridad: number;
  updateInicio: any;
  updateInicioHora: string;
  updateFinal: any;
  updateFinalHora: string;
  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;
  // Dates
  fechaInicio: Date;
  fechaFinal: Date;
  // SELECT
  selectPrioridades: Array<any>;
  // THEME HOUR
  ngxTimepickerTheme: any;

  @Output() updateFine = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // tslint:disable-next-line:no-shadowed-variable
    public EventoService: EventoService,
    // tslint:disable-next-line:no-shadowed-variable
    public PrioridadService: PrioridadService,
    private dialogRef: MatDialogRef<EventUpdateComponent>,
    public dialog: MatDialog,
  ) {
    // THEME HOUR
    this.ngxTimepickerTheme = environment.ngxTimepickerTheme;
    // Convertir string a objeto date
    this.fechaInicio = moment(data.start, 'YYYY/MM/DD HH:mm').toDate();
    this.fechaFinal = moment(data.end, 'YYYY/MM/DD HH:mm').toDate();
    // console.log(data.id);
    // console.log(data);
    this.updateNo = data.id;
    this.updateTitulo = data.title;
    this.updateDescripcion = data.description;
    this.updatePrioridad = data.preference_id;
    this.updateInicio = moment(this.fechaInicio).format('DD-MM-YYYY');
    this.updateInicioHora = moment(this.fechaInicio).format('HH:mm');
    // this.updateFinal = moment(data.end, 'DD/MM/YYYY').toDate();
    this.updateFinal = moment(this.fechaFinal).format('DD/MM/YYYY');
    this.updateFinalHora = moment(this.fechaFinal).format('HH:mm');
    this.title = 'Actualizar Registro';

    // console.log(this.updatePrioridad);
  }

  ngOnInit() {


    // VALIDACION
    this.grupoForm = new FormGroup({

      titulo: new FormControl(this.updateTitulo, [
        Validators.required,
        Validators.maxLength(this.updateTituloMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\,\.]*$'),
      ]),
      descripcion: new FormControl(this.updateDescripcion, [
        Validators.required,
        Validators.maxLength(this.updateDescripcionMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\,\.]*$'),
      ]),
      prioridad: new FormControl(+this.updatePrioridad, [
        Validators.required
      ]),
      inicio: new FormControl(this.fechaInicio, [
        Validators.required
      ]),
      inicioHora: new FormControl(this.updateInicioHora, [
        Validators.required,
        Validators.maxLength(this.updateInicioHoraMax),
        Validators.maxLength(this.updateInicioHoraMin),
        Validators.pattern('^[0-9]{2}:[0-9]{2}$'),
      ]),
      final: new FormControl(this.fechaFinal, [
        Validators.required
      ]),
      finalHora: new FormControl(this.updateFinalHora, [
        Validators.required,
        Validators.maxLength(this.updateFinalHoraMax),
        Validators.maxLength(this.updateFinalHoraMin),
        Validators.pattern('^[0-9]{2}:[0-9]{2}$'),
      ]),

    });

    // GET DATA SELECT
    this.getPrioridades();
  }

  // FILTRO FECHA
  entreSemanaFilter = (d: Date): boolean => {
    // console.log(d); // Object moment
    const check = moment(d, 'YYYY/MM/DD');
    const day = check.day();
    // const day = d.getDay(); // No funciona como viene en la documentación
    // console.log(day);
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  getPrioridades() {
    const result = this.PrioridadService.getItems();
    // console.log(result);
    result.toPromise()
      .then((response: any) => {
        this.selectPrioridades = response.data;
        console.log(response.data);
      })
      .catch(error => console.log('Error', error));
  }

  updateResource(form: any) {

    console.log('Actualizando');
    const dateInicio = moment(form.value.inicio).format('YYYY-MM-DD');
    const dateFinal = moment(form.value.final).format('YYYY-MM-DD');

    // console.log(form);
    const arrayValues: EventoInterface = {
      id: this.updateNo,
      title: form.value.titulo,
      description: form.value.descripcion,
      start: dateInicio + ' ' + form.value.inicioHora + ':00',
      end: dateFinal + ' ' + form.value.finalHora + ':00',
      preference_id: form.value.prioridad,
    };
    console.log(' Array primero: ' + arrayValues);
    console.log(arrayValues);
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.EventoService.updateItem(arrayValues);

    result.then((response) => {
      if (response) {
        this.updateFine.emit(response); // Emitiendo evento
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
