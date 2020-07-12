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
import { EntradaInterface } from '../../../services/documento/entrada/entrada-interface';
import { EntradaService } from '../../../services/documento/entrada/entrada.service';
// MOMENT
import * as moment from 'moment';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
// EMITIR EVENTO
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-document-received',
  templateUrl: './document-received.component.html',
  styleUrls: ['./document-received.component.css']
})
export class DocumentReceivedComponent implements OnInit {

  // VALIDACIONES
  receivedComentarioMax = 180;

  receivedNo: number;
  receivedTema: string;
  receivedControl: string;
  receivedConclusion: number;
  receivedExpiracion: string;
  receivedUrl: string;

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
    public EntradaService: EntradaService,
    // tslint:disable-next-line:no-shadowed-variable
    public PrioridadService: PrioridadService,
    // tslint:disable-next-line:no-shadowed-variable
    public EstadoService: EstadoService,
    private dialogRef: MatDialogRef<DocumentReceivedComponent>,
    public dialog: MatDialog,
  ) {
    // console.log(data);
    this.receivedNo = data.id;
    this.receivedTema = data.subject;
    this.receivedControl = data.control;
    this.receivedConclusion = data.conclution_id;
    this.receivedExpiracion = data.expiration;
    this.receivedUrl = data.url;
    this.updatePreference = data.preference_id;
    this.title = 'Recibir Registro';
   }

   ngOnInit() {
    // VALIDACION
    this.grupoForm = new FormGroup({

      prioridad: new FormControl(this.updatePreference, [
        Validators.required
      ]),

      estado: new FormControl(5, [
        Validators.required
      ]),
      comentario: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.receivedComentarioMax),
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
        this.selectEstados = response.data.filter(status => status.id === 5);
        console.log(this.selectEstados);
        console.log(response.data);
      })
      .catch(error => console.log('Error', error));
  }

  receivedResource(form: any) {

    const dateExpiracion = moment(this.receivedExpiracion).format('YYYY-MM-DD HH:mm:ss');
    console.log('Actualizando');
    // console.log(form);
    const arrayValues: EntradaInterface = {
      id: this.receivedNo,
      preference_id: form.value.prioridad,
      state_id: form.value.estado,
      feedback: form.value.comentario,
    };
    console.log(arrayValues);
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.EntradaService.recibirItem(arrayValues);

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
