import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
// SERVICES
import { ConclusionService  } from '../../../services/conclusion/conclusion.service';
import { EstadoService } from '../../../services/estado/estado.service';
// SERVICE EJECUTADO
import { FinalizadoInterface } from '../../../services/documento/finalizado/finalizado-interface';
import { EjecutadoService } from '../../../services/documento/ejecutado/ejecutado.service';
// MOMENT
import * as moment from 'moment';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
// EMITIR EVENTO
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-document-finished',
  templateUrl: './document-finished.component.html',
  styleUrls: ['./document-finished.component.css']
})
export class DocumentFinishedComponent implements OnInit {

  // VALIDACIONES
  finishedComentarioMax = 180;

  finishedNo: number;
  finishedTema: string;
  finishedControl: string;
  finishedConclusion: number;
  finishedExpiracion: string;
  finishedUrl: string;
  finishedPreference: number;

  public title: string;
  public grupoForm: FormGroup;

  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;
  // SELECT
  selectConclusiones: Array<any>;
  selectEstados: Array<any>;

  @Output() updateFine = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // tslint:disable-next-line:no-shadowed-variable
    public EjecutadoService: EjecutadoService,
    // tslint:disable-next-line:no-shadowed-variable
    public ConclusionService: ConclusionService,
    // tslint:disable-next-line:no-shadowed-variable
    public EstadoService: EstadoService,
    private dialogRef: MatDialogRef<DocumentFinishedComponent>,
    public dialog: MatDialog,
  ) {
    // console.log(data);
    this.finishedNo = data.id;
    this.finishedTema = data.subject;
    this.finishedControl = data.control;
    this.finishedConclusion = data.conclution_id;
    this.finishedExpiracion = data.expiration;
    this.finishedUrl = data.url;
    this.finishedPreference = data.preference_id;
    this.title = 'Finalizar Registro';
  }

  ngOnInit() {

    // VALIDACION
    this.grupoForm = new FormGroup({

      conclusion: new FormControl(+this.finishedConclusion, [
        Validators.required
      ]),
      estado: new FormControl(9, [
        Validators.required
      ]),
      comentario: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.finishedComentarioMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\,\.]*$'),
      ]),

    });
    // GET DATA SELECT
    this.getConclusiones();
    this.getEstados();
  }

  getConclusiones() {
    const result = this.ConclusionService.getItems();
    // console.log(result);
    result.toPromise()
      .then((response: any) => {
        this.selectConclusiones = response.data;
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
        this.selectEstados = response.data.filter(status => status.id === 9);
        console.log(this.selectEstados);
        console.log(response.data);
      })
      .catch(error => console.log('Error', error));
  }

  finishResource(form: any) {

    // const dateExpiracion = moment(this.finishedExpiracion).format('YYYY-MM-DD HH:mm:ss');
    console.log('Actualizando');
    // console.log(form);
    const arrayValues: FinalizadoInterface = {
      id: this.finishedNo,
      conclution_id: form.value.conclusion,
      state_id: form.value.estado,
      feedback: form.value.comentario,

    };
    console.log(arrayValues);
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.EjecutadoService.finalizarItem(arrayValues);

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
