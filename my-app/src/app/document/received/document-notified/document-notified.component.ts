import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
// SERVICES
import { PrioridadService } from '../../../services/prioridad/prioridad.service';
import { EstadoService } from '../../../services/estado/estado.service';
// import { NotificadoService } from '../../../services/documento/notificado/notificado.service';
// INTERFACE AND SERVICE
import { RecibidoInterface } from '../../../services/documento/recibido/recibido-interface';
import { RecibidoService } from '../../../services/documento/recibido/recibido.service';
// MOMENT
import * as moment from 'moment';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
// EMITIR EVENTO
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-document-notified',
  templateUrl: './document-notified.component.html',
  styleUrls: ['./document-notified.component.css']
})
export class DocumentNotifiedComponent implements OnInit {

  // VALIDACIONES
  notifiedComentarioMax = 180;

  notifiedNo: number;
  notifiedTema: string;
  notifiedControl: string;
  notifiedConclusion: number;
  notifiedExpiracion: string;
  notifiedUrl: string;

  public title: string;
  public grupoForm: FormGroup;

  updatePreference: number;
  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;

  // SELECT
  selectPrioridades: Array<any>;
  selectEstados: Array<any>;

  @Output() updateFine = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // tslint:disable-next-line:no-shadowed-variable
    public RecibidoService: RecibidoService,
    // tslint:disable-next-line:no-shadowed-variable
    public PrioridadService: PrioridadService,
    // tslint:disable-next-line:no-shadowed-variable
    public EstadoService: EstadoService,
    private dialogRef: MatDialogRef<DocumentNotifiedComponent>,
    public dialog: MatDialog,
  ) {
    // console.log(data);
    this.notifiedNo = data.id;
    this.notifiedTema = data.subject;
    this.notifiedControl = data.control;
    this.notifiedConclusion = data.conclution_id;
    this.notifiedExpiracion = data.expiration;
    this.notifiedUrl = data.url;
    this.updatePreference = data.preference_id;
    this.title = 'Notificar Registro';
  }

  ngOnInit() {
    // VALIDACION
    this.grupoForm = new FormGroup({

      prioridad: new FormControl(this.updatePreference, [
        Validators.required
      ]),

      estado: new FormControl(7, [
        Validators.required
      ]),
      comentario: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.notifiedComentarioMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\,\.]*$'),
      ]),

    });

    // GET DATA SELECT
    this.getPrioridades();
    this.getEstados();
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

  getEstados() {
    const result = this.EstadoService.getItems();
    // console.log(result);
    result.toPromise()
      .then((response: any) => {
        // filtrar solo el item 3
        // this.selectEstados = response.data;
        this.selectEstados = response.data.filter(status => status.id === 7);
        console.log(this.selectEstados);
        console.log(response.data);
      })
      .catch(error => console.log('Error', error));
  }

  // prioridadChange( form: any ) {

  //   console.log('cambiar prioridad');
  //   // console.log(form);
  //   const arrayValues: RecibidoInterface = {
  //     id: this.notifiedNo,
  //     preference_id: form.value.prioridad,
  //   };
  //   console.log(arrayValues);
  // }

  notificadeResource(form: any) {

    const dateExpiracion = moment(this.notifiedExpiracion).format('YYYY-MM-DD HH:mm:ss');
    console.log('Actualizando');
    // console.log(form);
    const arrayValues: RecibidoInterface = {
      id: this.notifiedNo,
      preference_id: form.value.prioridad,
      state_id: form.value.estado,
      feedback: form.value.comentario,
    };
    console.log(arrayValues);
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.RecibidoService.notificarItem(arrayValues);

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
