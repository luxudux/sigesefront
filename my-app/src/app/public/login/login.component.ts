import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
// INTERFACE AND SERVICE AUTENTICA
import { AutenticaService } from '../../services/autentica/autentica.service';
import { AutenticaInterface } from '../../services/autentica/autentica-interface';
// MOMENT
import * as moment from 'moment';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
// EMITIR EVENTO
import { Output, EventEmitter } from '@angular/core';
// Configuration
import { environment } from '../../../environments/environment';

export interface AnioInterface {
  id: number;
  name: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // VALIDACIONES
  validateUsuarioMax = 20;
  validateClaveMax = 20;
  hidePassword = true;
  hideUser = false;

  public title: string;
  public grupoForm: FormGroup;
  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;

  // SELECT
  selectAnios: AnioInterface[];

  @Output() addFine = new EventEmitter<any>();

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    public AutenticaService: AutenticaService,
    // tslint:disable-next-line:no-shadowed-variable
    public dialog: MatDialog,
  ) {
    this.title = 'SIGESE Login';
    this.selectAnios = [
      { id: 2019, name: 'Año 2019' },
      { id: 2020, name: 'Año 2020' },
    ];
  }

  ngOnInit() {
    this.grupoForm = new FormGroup({

      usuario: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.validateUsuarioMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\.]*$'),

      ]),
      clave: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.validateClaveMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\.]*$'),

      ]),
      anio: new FormControl('', [
        Validators.required,
      ]),

    });
  }

  login() {
    console.log('login al sistema');

    const usuario = this.grupoForm.value.usuario;
    const clave = this.grupoForm.value.clave;
    // console.log(arrayValues);
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.AutenticaService.logIn(usuario, clave);
    result.then((response) => {
      console.log(response);
      if (response) {
        this.addFine.emit(response); // Emitiendo evento
        // this.dialogRef.close(); // Close and refresh
        this.loadingDialogRef.close();
      } else {
        // this.dialogRef.close(); // Close and refresh
        this.loadingDialogRef.close();
        this.errorDialogRef = this.dialog.open(
          DialogErrorComponent, { disableClose: true });
      }
    });

  }
}
