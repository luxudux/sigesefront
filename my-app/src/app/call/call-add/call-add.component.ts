import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
// SERVICES
import { ContactoService } from '../../services/contacto/contacto.service';
// INTERFACE AND SERVICE DELEGACION
import { LlamadaInterface } from '../../services/llamada/llamada-interface';
import { LlamadaService } from '../../services/llamada/llamada.service';
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
  selector: 'app-call-add',
  templateUrl: './call-add.component.html',
  styleUrls: ['./call-add.component.css']
})
export class CallAddComponent implements OnInit {

  // VALIDACIONES
  updateNotaMax = 180;
  updateDiaMax = 180;
  updateDiaMin = 9;
  updateHoraMax = 5;
  updateHoraMin = 5;

  public title: string;
  public grupoForm: FormGroup;
  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;
  // Dates
  fechaLlamada: Date; // dia actual
  horaLlamada: string;  // hora
  // SELECT
  selectContactos: Array<any>;
  // THEME HOUR
  ngxTimepickerTheme: any;

  @Output() addFine = new EventEmitter<any>();

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    public LlamadaService: LlamadaService,
    // tslint:disable-next-line:no-shadowed-variable
    public ContactoService: ContactoService,
    private dialogRef: MatDialogRef<CallAddComponent>,
    public dialog: MatDialog,
  ) {
    this.title = 'Nuevo Registro';
    // THEME HOUR
    this.ngxTimepickerTheme = environment.ngxTimepickerTheme;
    // Date actual y convertir objeto date
    this.fechaLlamada = moment().toDate();
    this.horaLlamada =  moment(this.fechaLlamada).format('HH:mm');

  }

  ngOnInit() {
    // VALIDACION
    this.grupoForm = new FormGroup({

      nota: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.updateNotaMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\,\.]*$'),
      ]),
      dia: new FormControl(this.fechaLlamada, [
        Validators.required
      ]),
      hora: new FormControl(this.horaLlamada, [
        Validators.required,
        Validators.maxLength(this.updateHoraMax),
        Validators.maxLength(this.updateHoraMin),
        Validators.pattern('^[0-9]{2}:[0-9]{2}$'),
      ]),
      contacto: new FormControl('', [
        Validators.required
      ]),

    });

    // GET DATA SELECT
    this.getContactos();
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

  getContactos() {
    const result = this.ContactoService.getItems();
    // console.log(result);
    result.toPromise()
      .then((response: any) => {
        this.selectContactos = response.data;
        console.log(response.data);
      })
      .catch(error => console.log('Error', error));
  }

  createResource() {
    console.log('Creando');
    const dateDia = moment(this.grupoForm.value.dia).format('YYYY-MM-DD');

    const arrayValues: LlamadaInterface = {
      note: this.grupoForm.value.nota,
      day: dateDia + ' ' + this.grupoForm.value.hora + ':00',
      contact_id: this.grupoForm.value.contacto,
    };
    // console.log(arrayValues);
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.LlamadaService.addItem(arrayValues);
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
