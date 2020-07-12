import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
// INTERFACE AND SERVICE EVENTO
import { EventoInterface } from '../../services/evento/evento-interface';
import { EventoService } from '../../services/evento/evento.service';
// SERVICES
import { PrioridadService } from '../../services/prioridad/prioridad.service';
// MOMENT AND JQUERY
import * as moment from 'moment';
import * as $ from 'jquery';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
// EMITIR EVENTO
import { Output, EventEmitter } from '@angular/core';
// Configuration
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css'],
  providers: [

  ]
})
export class EventAddComponent implements OnInit {

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
  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;

  // SELECT
  selectPrioridades: Array<any>;
  // THEME HOUR
  ngxTimepickerTheme: any;

  @Output() addFine = new EventEmitter<any>();

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    public EventoService: EventoService,
    // tslint:disable-next-line:no-shadowed-variable
    public PrioridadService: PrioridadService,
    private dialogRef: MatDialogRef<EventAddComponent>,
    public dialog: MatDialog,
  ) {
    this.title = 'Nuevo Registro';
    // THEME HOUR
    this.ngxTimepickerTheme = environment.ngxTimepickerTheme;
  }

  ngOnInit() {
    // VALIDACION
    this.grupoForm = new FormGroup({

      titulo: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.updateTituloMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\,\.]*$'),
      ]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.updateDescripcionMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\,\.]*$'),
      ]),
      prioridad: new FormControl('', [
        Validators.required
      ]),
      inicio: new FormControl('', [
        Validators.required
      ]),
      inicioHora: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.updateInicioHoraMax),
        Validators.maxLength(this.updateInicioHoraMin),
        Validators.pattern('^[0-9]{2}:[0-9]{2}$'),
      ]),
      final: new FormControl('', [
        Validators.required
      ]),
      finalHora: new FormControl('', [
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

  createResource() {
    console.log('Creando');

    const dateInicio = moment(this.grupoForm.value.inicio).format('YYYY-MM-DD');
    const dateFinal = moment(this.grupoForm.value.final).format('YYYY-MM-DD');

    const arrayValues: EventoInterface = {
      title: this.grupoForm.value.titulo,
      description: this.grupoForm.value.descripcion,
      start: dateInicio + ' ' + this.grupoForm.value.inicioHora + ':00',
      end: dateFinal + ' ' + this.grupoForm.value.finalHora + ':00',
      preference_id: this.grupoForm.value.prioridad,
    };
    // console.log(arrayValues);
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.EventoService.addItem(arrayValues);
    result.then((response) => {
      // console.log(response);
      if (response) {
        this.addFine.emit(response); // Emitiendo evento
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
