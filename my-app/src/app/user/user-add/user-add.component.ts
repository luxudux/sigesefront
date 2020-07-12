import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
// SERVICES
import { NivelService } from '../../services/nivel/nivel.service';
import { OficinaService } from '../../services/oficina/oficina.service';
// INTERFACE AND SERVICE USUARIO
import { UsuarioInterface } from '../../services/usuario/usuario-interface';
import { UsuarioService } from '../../services/usuario/usuario.service';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
// EMITIR EVENTO
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  // VALIDACIONES
  updateNombreMax = 20;
  updateClaveMax = 30;

  public title: string;
  public grupoForm: FormGroup;
  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;

  // SELECT
  selectNiveles: Array<any>;
  selectOficinas: Array<any>;

  @Output() addFine = new EventEmitter<any>();

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    public UsuarioService: UsuarioService,
    // tslint:disable-next-line:no-shadowed-variable
    public NivelService: NivelService,
    // tslint:disable-next-line:no-shadowed-variable
    public OficinaService: OficinaService,
    private dialogRef: MatDialogRef<UserAddComponent>,
    public dialog: MatDialog,
  ) {
    this.title = 'Nuevo Registro';
  }
  ngOnInit() {
    // console.log(this.ActivoService.getLista());
    // console.log(this.NivelService.getLista());
    // VALIDACION
    this.grupoForm = new FormGroup({

      nombre: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.updateNombreMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\.]*$'),
      ]),
      clave: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.updateClaveMax),
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\.]*$'),
      ]),
      rclave: new FormControl('', [
        Validators.required,
      ]),
      nivel: new FormControl('', [
        Validators.required
      ]),
      oficina: new FormControl('', [
        Validators.required
      ]),

    });

    // GET DATA SELECT
    this.getNiveles();
    this.getOficinas();
  }

  getNiveles() {
    const result = this.NivelService.getItems();
    // console.log(result);
    result.toPromise()
      .then((response: any) => {
        this.selectNiveles = response.data;
        console.log(response.data);
      })
      .catch(error => console.log('Error', error));
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

  createResource() {
    console.log('Creando');

    const arrayValues: UsuarioInterface = {
      name: this.grupoForm.value.nombre,
      password: this.grupoForm.value.clave,
      level_id: this.grupoForm.value.nivel,
      office_id:  this.grupoForm.value.oficina,
    };
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.UsuarioService.addItem(arrayValues);
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
