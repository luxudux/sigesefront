import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
// SERVICES
import { TipoService } from '../../../services/tipo/tipo.service';
// INTERFACE AND SERVICE DOCUMENTO
import { DocumentoInterface } from '../../../services/documento/documento-interface';
import { ElaboradoService } from '../../../services/documento/elaborado/elaborado.service';
// MOMENT
import * as moment from 'moment';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
// EMITIR EVENTO
import { Output, EventEmitter } from '@angular/core';
// Configuration
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-document-update',
  templateUrl: './document-update.component.html',
  styleUrls: ['./document-update.component.css']
})
export class DocumentUpdateComponent implements OnInit {

  // VALIDACIONES
  updateExpiracionMax = 10;
  updateExpiracionMin = 9;
  updateExpiracionHoraMax = 5;
  updateExpiracionHoraMin = 5;
  updateTemaMax = 150;
  updateControlMax = 20;

  public title: string;
  public grupoForm: FormGroup;

  updateNo: number;
  updateTema: string;
  updateControl: string;
  updateTipo: number;
  updateDia: any;
  updateHora: string;
  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;
  // SELECT
  selectTipos: Array<any>;
  // Dates
  fechaExpiracion: Date;
  // THEME HOUR
  ngxTimepickerTheme: any;

  @Output() updateFine = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // tslint:disable-next-line:no-shadowed-variable
    public ElaboradoService: ElaboradoService,
    // tslint:disable-next-line:no-shadowed-variable
    public TipoService: TipoService,
    private dialogRef: MatDialogRef<DocumentUpdateComponent>,
    public dialog: MatDialog,
  ) {
    // THEME HOUR
    this.ngxTimepickerTheme = environment.ngxTimepickerTheme;
    // Convertir string a objeto date
    this.fechaExpiracion = moment(data.expiration, 'YYYY/MM/DD HH:mm').toDate();
    console.log(data.id);
    console.log(data);
    this.updateNo = data.id;
    this.updateTema = data.subject;
    this.updateControl = data.control;
    this.updateTipo = data.type_id;
    this.updateDia = moment(this.fechaExpiracion).format('DD-MM-YYYY');
    this.updateHora = moment(this.fechaExpiracion).format('HH:mm');
    this.title = 'Actualizar Registro';
  }

  ngOnInit() {

    // VALIDACION
    this.grupoForm = new FormGroup({

      tema: new FormControl(this.updateTema, [
        Validators.required,
        Validators.maxLength(this.updateTemaMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\,\.]*$'),
      ]),
      control: new FormControl(this.updateControl, [
        Validators.required,
        Validators.maxLength(this.updateControlMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\,\.]*$'),
      ]),
      expiracion: new FormControl(this.fechaExpiracion, [
        Validators.required,
      ]),
      hora: new FormControl(this.updateHora, [
        Validators.required,
        Validators.maxLength(this.updateExpiracionHoraMax),
        Validators.maxLength(this.updateExpiracionHoraMin),
        Validators.pattern('^[0-9]{2}:[0-9]{2}$'),
      ]),
      tipo: new FormControl(+this.updateTipo, [
        Validators.required,
      ]),

    });

    // GET DATA SELECT
    this.getTipos();
  }

  getTipos() {
    const result = this.TipoService.getItems();
    // console.log(result);
    result.toPromise()
      .then((response: any) => {
        this.selectTipos = response.data;
        console.log(response.data);
      })
      .catch(error => console.log('Error', error));
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

  updateResource(form: any) {

    console.log('Actualizando');
    const dateExpiracion = moment(form.value.dia).format('YYYY-MM-DD');

    // console.log(form);
    const arrayValues: DocumentoInterface = {
      id: this.updateNo,
      subject: form.value.tema,
      expiration: dateExpiracion + ' ' + form.value.hora + ':00',
      control: form.value.control,
      type_id: form.value.tipo,
      conclution_id: 1,
      preference_id: 1,
      url: 'http://pagina.com/' + Math.round(Math.random() * 999999),
    };
    console.log(' Array primero: ' + arrayValues);
    console.log(arrayValues);
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.ElaboradoService.updateItem(arrayValues);

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
