import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
// SERVICES
import { DelegacionService } from '../../services/delegacion/delegacion.service';
// INTERFACE AND SERVICE DELEGACION
import { OficinaInterface } from '../../services/oficina/oficina-interface';
import { OficinaService } from '../../services/oficina/oficina.service';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
// EMITIR EVENTO
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-office-update',
  templateUrl: './office-update.component.html',
  styleUrls: ['./office-update.component.css']
})
export class OfficeUpdateComponent implements OnInit {

  // VALIDACIONES
  updateNombreMax = 20;
  updateAcronimoMax = 20;
  updateCodigoMax = 20;

  public title: string;
  public grupoForm: FormGroup;

  updateNo: number;
  updateNombre: string;
  updateAcronimo: string;
  updateCodigo: string;
  updateDelegacion: number;
  updateCorreo: string;
  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;

  // SELECT
  selectDelegaciones: Array<any>;

  @Output() updateFine = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // tslint:disable-next-line:no-shadowed-variable
    public OficinaService: OficinaService,
    // tslint:disable-next-line:no-shadowed-variable
    public DelegacionService: DelegacionService,
    private dialogRef: MatDialogRef<OfficeUpdateComponent>,
    public dialog: MatDialog,
  ) {
    console.log(data.id);
    this.updateNo = data.id;
    this.updateNombre = data.name;
    this.updateAcronimo = data.acronym;
    this.updateCodigo = data.code;
    this.updateDelegacion = data.delegation_id;
    this.updateCorreo = data.mail;
    this.title = 'Actualizar Registro';
  }

  ngOnInit() {
    // VALIDACION
    this.grupoForm = new FormGroup({

      nombre: new FormControl(this.updateNombre, [
        Validators.required,
        Validators.maxLength(this.updateNombreMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\.]*$'),
      ]),
      acronimo: new FormControl(this.updateAcronimo, [
        Validators.required,
        Validators.maxLength(this.updateAcronimoMax),
        Validators.pattern('^[0-9a-zA-ZñÑ\\s\-]*$'),
      ]),
      codigo: new FormControl(this.updateCodigo, [
        Validators.required,
        Validators.maxLength(this.updateCodigoMax),
        Validators.pattern('^[0-9a-zA-Z\\s\-\.]*$'),
      ]),
      correo: new FormControl(this.updateCorreo, [
        Validators.required,
        Validators.email,
      ]),
      delegacion: new FormControl(+this.updateDelegacion, [
        Validators.required,
      ]),
    });

    // GET DATA SELECT
    this.getDelegaciones();

  }

  getDelegaciones() {
    const result = this.DelegacionService.getItems();
    // console.log(result);
    result.toPromise()
      .then((response: any) => {
        this.selectDelegaciones = response.data;
        console.log(response.data);
      })
      .catch(error => console.log('Error', error));
  }

  updateResource(form: any) {
    console.log('Actualizando');
    // console.log(form);
    const arrayValues: OficinaInterface = {
      id: this.updateNo,
      name: form.value.nombre,
      acronym: form.value.acronimo,
      code: form.value.codigo,
      mail: form.value.correo,
      delegation_id: form.value.delegacion,
    };
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.OficinaService.updateItem(arrayValues);

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
