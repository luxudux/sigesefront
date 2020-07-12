import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
// SERVICES
import { GeneroService } from '../../services/genero/genero.service';
import { CiudadService } from '../../services/ciudad/ciudad.service';
// INTERFACE AND SERVICE CONTACTO
import { ContactoInterface } from '../../services/contacto/contacto-interface';
import { ContactoService } from '../../services/contacto/contacto.service';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
// EMITIR EVENTO
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css']
})
export class ContactAddComponent implements OnInit {

  // VALIDACIONES
  updateNombreMax = 20;
  updateApellidoMax = 20;
  updateTelPriMax = 20;
  updateTelSecMax = 20;
  updateInstitucionMax = 90;

  public title: string;
  public grupoForm: FormGroup;
  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;

  // SELECT
  selectCiudades: Array<any>;

  @Output() addFine = new EventEmitter<any>();

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    public ContactoService: ContactoService,
    // tslint:disable-next-line:no-shadowed-variable
    public GeneroService: GeneroService,
    // tslint:disable-next-line:no-shadowed-variable
    public CiudadService: CiudadService,
    private dialogRef: MatDialogRef<ContactAddComponent>,
    public dialog: MatDialog,
  ) {
    this.title = 'Nuevo Registro';
  }
  ngOnInit() {
    // console.log(this.ActivoService.getLista());
    // console.log(this.NivelService.getLista());
    // console.log(this.TrabajadorService.getLista());
    // VALIDACION
    this.grupoForm = new FormGroup({

      nombre: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.updateNombreMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\.]*$'),
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.updateApellidoMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\.]*$'),
      ]),
      ciudad: new FormControl('', [
        Validators.required,
      ]),
      telPri: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.updateTelPriMax),
        Validators.pattern('^[0-9\\s\-\(\)\+]*$'),
      ]),
      telSec: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.updateTelSecMax),
        Validators.pattern('^[0-9\\s\-\(\)\+]*$'),
      ]),
      genero: new FormControl('', [
        Validators.required,
      ]),
      correo: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      institucion: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.updateInstitucionMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\.]*$'),
      ]),

    });

    // GET DATA SELECT
    this.getCiudades();

  }

  getCiudades() {
    const result = this.CiudadService.getItems();
    // console.log(result);
    result.toPromise()
      .then((response: any) => {
        this.selectCiudades = response.data;
        console.log(response.data);
      })
      .catch(error => console.log('Error', error));
  }

  createResource() {
    console.log('Creando');

    const arrayValues: ContactoInterface = {
      name: this.grupoForm.value.nombre,
      surname: this.grupoForm.value.apellido,
      town_id: this.grupoForm.value.ciudad,
      phone_p: this.grupoForm.value.telPri,
      phone_s: this.grupoForm.value.telSec,
      sex: this.grupoForm.value.genero,
      mail: this.grupoForm.value.correo,
      institution: this.grupoForm.value.institucion,
    };
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.ContactoService.addItem(arrayValues);
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
