import { Component, OnInit } from '@angular/core';
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
  selector: 'app-office-add',
  templateUrl: './office-add.component.html',
  styleUrls: ['./office-add.component.css']
})
export class OfficeAddComponent implements OnInit {

  // VALIDACIONES
  updateNombreMax = 60;
  updateAcronimoMax = 20;
  updateCodigoMax = 20;

  public title: string;
  public grupoForm: FormGroup;
  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;

  // SELECT
  selectDelegaciones: Array<any>;

  @Output() addFine = new EventEmitter<any>();

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    public OficinaService: OficinaService,
    // tslint:disable-next-line:no-shadowed-variable
    public DelegacionService: DelegacionService,
    private dialogRef: MatDialogRef<OfficeAddComponent>,
    public dialog: MatDialog,
  ) {
    this.title = 'Nuevo Registro';
  }
  ngOnInit() {
    // VALIDACION
    this.grupoForm = new FormGroup({

      nombre: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.updateNombreMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\.]*$'),
      ]),
      acronimo: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.updateAcronimoMax),
        Validators.pattern('^[0-9a-zA-ZñÑ\\s\-]*$'),
      ]),
      codigo: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.updateCodigoMax),
        Validators.pattern('^[0-9a-zA-Z\\s\-\.]*$'),
      ]),
      correo: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      delegacion: new FormControl('', [
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
  createResource() {
    console.log('Creando');

    const arrayValues: OficinaInterface = {
      name: this.grupoForm.value.nombre,
      acronym: this.grupoForm.value.acronimo,
      code: this.grupoForm.value.codigo,
      mail: this.grupoForm.value.correo,
      delegation_id: this.grupoForm.value.delegacion,
    };
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.OficinaService.addItem(arrayValues);
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
