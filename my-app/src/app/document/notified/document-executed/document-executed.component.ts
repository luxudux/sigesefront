import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
// SERVICES
import { TrabajadorService } from '../../../services/trabajador/trabajador.service';
import { EstadoService } from '../../../services/estado/estado.service';
// INTERFACE AND SERVICE
import { NotificadoInterface } from '../../../services/documento/notificado/notificado-interface';
import { NotificadoService } from '../../../services/documento/notificado/notificado.service';
// MOMENT
import * as moment from 'moment';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
// EMITIR EVENTO
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-document-executed',
  templateUrl: './document-executed.component.html',
  styleUrls: ['./document-executed.component.css']
})
export class DocumentExecutedComponent implements OnInit {

  // VALIDACIONES
  executeComentarioMax = 180;

  executeNo: number;
  executeTema: string;
  executeControl: string;
  executeConclusion: number;
  executeExpiracion: string;
  executePrioridad: string;
  executeUrl: string;
  executePreference: number;

  public title: string;
  public grupoForm: FormGroup;

  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;

  // SELECT
  selectTrabajadores: Array<any>;
  selectEstados: Array<any>;

  @Output() updateFine = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // tslint:disable-next-line:no-shadowed-variable
    public NotificadoService: NotificadoService,
    // tslint:disable-next-line:no-shadowed-variable
    public TrabajadorService: TrabajadorService,
    // tslint:disable-next-line:no-shadowed-variable
    public EstadoService: EstadoService,
    private dialogRef: MatDialogRef<DocumentExecutedComponent>,
    public dialog: MatDialog,
  ) {
    // console.log(data);
    this.executeNo = data.id;
    this.executeTema = data.subject;
    this.executeControl = data.control;
    this.executeConclusion = data.conclution_id;
    this.executeExpiracion = data.expiration;
    this.executeUrl = data.url;
    this.executePreference = data.preference_id;
    this.title = 'Asignar ejecutor';
  }

  ngOnInit() {
    // VALIDACION
    this.grupoForm = new FormGroup({

      trabajador: new FormControl('', [
        Validators.required
      ]),
      estado: new FormControl(8, [
        Validators.required
      ]),
      comentario: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.executeComentarioMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\,\.]*$'),
      ]),

    });

    // GET DATA SELECT
    this.getTrabajadores();
    this.getEstados();
  }

  getTrabajadores() {
    const result = this.TrabajadorService.getItems();
    // console.log(result);
    result.toPromise()
      .then((response: any) => {
        this.selectTrabajadores = response.data;
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
        this.selectEstados = response.data.filter(status => status.id === 8);
        console.log(this.selectEstados);
        console.log(response.data);
      })
      .catch(error => console.log('Error', error));
  }

  ejecuteResource(form: any) {

    const dateExpiracion = moment(this.executeExpiracion).format('YYYY-MM-DD HH:mm:ss');
    console.log('Actualizando');
    // console.log(form);
    const arrayValues: NotificadoInterface = {
      id: this.executeNo,
      state_id: form.value.estado,
      workers: form.value.trabajador,
      feedback: form.value.comentario,
    };
    console.log(arrayValues);
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.NotificadoService.ejecutarItem(arrayValues);

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
