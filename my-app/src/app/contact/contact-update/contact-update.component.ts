import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrls: ['./contact-update.component.css']
})
export class ContactUpdateComponent implements OnInit {

  // VALIDACIONES
  updateNombreMax = 20;
  updateApellidoMax = 20;
  updateTelPriMax = 20;
  updateTelSecMax = 20;
  updateInstitucionMax = 50;

  public title: string;
  public grupoForm: FormGroup;

  updateNo: number;
  updateNombre: string;
  updateApellido: string;
  updateCiudad: string;
  updateTelP: string;
  updateTelS: string;
  updateGenero: string;
  updateCorreo: string;
  updateInstitucion: string;
  updateOficina: number;
  updateUsuario: number;
  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;

  // SELECT
  selectCiudades: Array<any>;

  @Output() updateFine = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // tslint:disable-next-line:no-shadowed-variable
    public ContactoService: ContactoService,
    // tslint:disable-next-line:no-shadowed-variable
    public GeneroService: GeneroService,
    // tslint:disable-next-line:no-shadowed-variable
    public CiudadService: CiudadService,
    private dialogRef: MatDialogRef<ContactUpdateComponent>,
    public dialog: MatDialog,
  ) {
    console.log(data.id);
    this.updateNo = data.id;
    this.updateNombre = data.name;
    this.updateApellido = data.surname;
    this.updateCiudad = data.town_id;
    this.updateTelP = data.phone_p;
    this.updateTelS = data.phone_s;
    this.updateGenero = data.sex;
    this.updateCorreo = data.mail;
    this.updateInstitucion = data.institution;
    this.updateOficina = data.office_id;
    this.updateUsuario = data.user_id;
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
      apellido: new FormControl(this.updateApellido, [
        Validators.required,
        Validators.maxLength(this.updateApellidoMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\.]*$'),
      ]),
      ciudad: new FormControl(this.updateCiudad, [
        Validators.required,
      ]),
      telPri: new FormControl(this.updateTelP, [
        Validators.required,
        Validators.maxLength(this.updateTelPriMax),
        Validators.pattern('^[0-9\\s\-\(\)\+]*$'),
      ]),
      telSec: new FormControl(this.updateTelS, [
        Validators.required,
        Validators.maxLength(this.updateTelSecMax),
        Validators.pattern('^[0-9\\s\-\(\)\+]*$'),
      ]),
      genero: new FormControl(this.updateGenero, [
        Validators.required,
      ]),
      correo: new FormControl(this.updateCorreo, [
        Validators.required,
        Validators.email,
      ]),
      institucion: new FormControl(this.updateInstitucion, [
        Validators.required,
        Validators.maxLength(this.updateInstitucionMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\,\.]*$'),
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

  updateResource(form: any) {
    console.log('Actualizando');
    // console.log(form);
    const arrayValues: ContactoInterface = {
      id: this.updateNo,
      name: form.value.nombre,
      surname: form.value.apellido,
      town_id: form.value.ciudad,
      phone_p: form.value.telPri,
      phone_s: form.value.telSec,
      sex: form.value.genero,
      mail: form.value.correo,
      institution: form.value.institucion,
    };
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.ContactoService.updateItem(arrayValues);

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
