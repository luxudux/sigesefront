import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
  selector: 'app-call-update',
  templateUrl: './call-update.component.html',
  styleUrls: ['./call-update.component.css']
})
export class CallUpdateComponent implements OnInit {

  // VALIDACIONES
  updateNotaMax = 180;
  updateDiaMax = 180;
  updateDiaMin = 9;
  updateHoraMax = 5;
  updateHoraMin = 5;

  public title: string;
  public grupoForm: FormGroup;

  updateNo: number;
  updateNota: string;
  updateDia: any;
  updateHora: string;
  updateContacto: number;
  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;
  // Dates
  fechaLlamada: Date;
  // SELECT
  selectContactos: Array<any>;
  // THEME HOUR
  ngxTimepickerTheme: any;

  @Output() updateFine = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // tslint:disable-next-line:no-shadowed-variable
    public LlamadaService: LlamadaService,
    // tslint:disable-next-line:no-shadowed-variable
    public ContactoService: ContactoService,
    private dialogRef: MatDialogRef<CallUpdateComponent>,
    public dialog: MatDialog,
  ) {
    // THEME HOUR
    this.ngxTimepickerTheme = environment.ngxTimepickerTheme;
    // Convertir string a objeto date
    this.fechaLlamada = moment(data.day, 'YYYY/MM/DD HH:mm').toDate();
    console.log(data.id);
    // console.log(data);
    this.updateNo = data.id;
    this.updateNota = data.note;
    this.updateDia =  moment(this.fechaLlamada).format('DD-MM-YYYY');
    this.updateHora = moment(this.fechaLlamada).format('HH:mm');
    this.updateContacto = data.contact_id;
    this.title = 'Actualizar Registro';
  }

  ngOnInit() {

    // VALIDACION
    this.grupoForm = new FormGroup({

      nota: new FormControl(this.updateNota, [
        Validators.required,
        Validators.maxLength(this.updateNotaMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\,\.]*$'),
      ]),
      dia: new FormControl(this.fechaLlamada, [
        Validators.required
      ]),
      hora: new FormControl(this.updateHora, [
        Validators.required,
        Validators.maxLength(this.updateHoraMax),
        Validators.maxLength(this.updateHoraMin),
        Validators.pattern('^[0-9]{2}:[0-9]{2}$'),
      ]),
      contacto: new FormControl(+this.updateContacto, [
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

  updateResource(form: any) {

    console.log('Actualizando');
    const dateDia = moment(form.value.dia).format('YYYY-MM-DD');

    // console.log(form);
    const arrayValues: LlamadaInterface = {
      id: this.updateNo,
      note: form.value.nota,
      day: dateDia + ' ' + form.value.hora + ':00',
      contact_id: form.value.contacto,
    };
    console.log(' Array primero: ' + arrayValues);
    console.log(arrayValues);
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.LlamadaService.updateItem(arrayValues);

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
