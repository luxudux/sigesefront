import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
// SERVICES
import { TipoService } from '../../../services/tipo/tipo.service';
// INTERFACE AND SERVICE EVENTO
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
  selector: 'app-document-add',
  templateUrl: './document-add.component.html',
  styleUrls: ['./document-add.component.css']
})
export class DocumentAddComponent implements OnInit {

  // VALIDACIONES
  addExpiracionMax = 10;
  addExpiracionMin = 9;
  addExpiracionHoraMax = 5;
  addExpiracionHoraMin = 5;
  addTemaMax = 150;
  addControlMax = 20;
  addComentarioMax = 180;

  public title: string;
  public grupoForm: FormGroup;

  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;

  // SELECT
  selectTipos: Array<any>;

  // THEME HOUR
  ngxTimepickerTheme: any;

  @Output() addFine = new EventEmitter<any>();

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    public ElaboradoService: ElaboradoService,
    // tslint:disable-next-line:no-shadowed-variable
    public TipoService: TipoService,
    private dialogRef: MatDialogRef<DocumentAddComponent>,
    public dialog: MatDialog,
  ) {
    this.title = 'Nuevo documento ';
    // THEME HOUR
    this.ngxTimepickerTheme = environment.ngxTimepickerTheme;
  }

  ngOnInit() {

    // VALIDACION
    this.grupoForm = new FormGroup({

      tema: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.addTemaMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\,\.]*$'),
      ]),
      control: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.addControlMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\,\.]*$'),
      ]),
      expiracion: new FormControl('', [
        Validators.required,
      ]),
      hora: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.addExpiracionHoraMax),
        Validators.maxLength(this.addExpiracionHoraMin),
        Validators.pattern('^[0-9]{2}:[0-9]{2}$'),
      ]),
      comentario: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.addComentarioMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\,\.]*$'),
      ]),
      tipo: new FormControl('', [
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

  createResource() {

    const dateExpiracion = moment(this.grupoForm.value.expiracion).format('YYYY-MM-DD');
    console.log('Creando');
    // console.log(form);
    const arrayValues: DocumentoInterface = {

      subject: this.grupoForm.value.tema,
      expiration: dateExpiracion + ' ' + this.grupoForm.value.hora + ':00',
      control: this.grupoForm.value.control,
      type_id: this.grupoForm.value.tipo,
      conclution_id: 1,
      preference_id: 1,
      url: 'http://pagina.com/' + Math.round(Math.random() * 999999),
      state_id: 1,
      feedback: this.grupoForm.value.comentario,
    };
    console.log(arrayValues);
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.ElaboradoService.addItem(arrayValues);

    result.then((response) => {
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
