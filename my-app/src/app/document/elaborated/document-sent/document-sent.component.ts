import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
// SERVICES
import { OficinaService } from '../../../services/oficina/oficina.service';
// INTERFACE AND SERVICE EVENTO
import { DocumentoInterface } from '../../../services/documento/documento-interface';
import { ElaboradoService } from '../../../services/documento/elaborado/elaborado.service';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
// EMITIR EVENTO
import { Output, EventEmitter } from '@angular/core';
// Configuration
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-document-sent',
  templateUrl: './document-sent.component.html',
  styleUrls: ['./document-sent.component.css']
})
export class DocumentSentComponent implements OnInit {

  // VALIDACIONES
  sentComentarioMax = 180;

  sentNo: number;
  sentTema: string;
  sentExpiracion: string;

  public title: string;
  public grupoForm: FormGroup;

  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;

  // SELECT
  selectOficinas: Array<any>;

  @Output() sentFine = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // tslint:disable-next-line:no-shadowed-variable
    public ElaboradoService: ElaboradoService,
    // tslint:disable-next-line:no-shadowed-variable
    public OficinaService: OficinaService,
    private dialogRef: MatDialogRef<DocumentSentComponent>,
    public dialog: MatDialog,
  ) {
    this.sentNo = data.id;
    this.sentTema = data.subject;
    this.sentExpiracion = data.expiration;
    this.title = 'Enviar documento';
  }

  ngOnInit() {
    // console.log(this.OficinaService.getLista());
    // VALIDACION
    this.grupoForm = new FormGroup({

      oficina: new FormControl('', [
        Validators.required
      ]),
      comentario: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.sentComentarioMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\,\.]*$'),
      ]),

    });

    // GET DATA SELECT
    this.getOficinas();
  }

  getOficinas() {
    const result = this.OficinaService.getItems();
    // console.log(result);
    result.toPromise()
      .then((response: any) => {
        this.selectOficinas = response.data;
        console.log(response.data);
      })
      .catch(error => console.log('Error', error));
  }

  sendResource(form: any) {

    console.log('Creando');
    // console.log(form);
    // console.log(i);
    const arrayValues: any = {
      document_id: this.sentNo,
      offices: form.value.oficina,
      state_id: 4,
      feedback: form.value.comentario,
    };
    console.log(arrayValues);
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });
    const result = this.ElaboradoService.sendItems(arrayValues);
    result.then((response) => {
      if (response) {
          // console.log('emitiendo: ');
          // console.log(response);
          this.sentFine.emit(response); // Emitiendo evento
          this.dialogRef.close(); // Close and refresh
          this.loadingDialogRef.close();
      } else {
        // this.dialogRef.close(); // Close and refresh
        // this.loadingDialogRef.close();
        console.log('Hubo un fallo en');
        this.errorDialogRef = this.dialog.open(
          DialogErrorComponent, { disableClose: true });
      }
    });
    this.loadingDialogRef.close();


    // this.dialogRef.close(); // Close and refresh
  }

}
