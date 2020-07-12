import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
// INTERFACE AND SERVICE NIVEL
import { NivelInterface } from '../../services/nivel/nivel-interface';
import { NivelService } from '../../services/nivel/nivel.service';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
// EMITIR EVENTO
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-level-add',
  templateUrl: './level-add.component.html',
  styleUrls: ['./level-add.component.css']
})
export class LevelAddComponent implements OnInit {

  // VALIDACIONES
  updateNombreMax = 20;

  public title: string;
  public grupoForm: FormGroup;
  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;

  @Output() addFine = new EventEmitter<any>();

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    public NivelService: NivelService,
    private dialogRef: MatDialogRef<LevelAddComponent>,
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

    });
  }
  createResource() {
    console.log('Creando');

    const arrayValues: NivelInterface = {
      name: this.grupoForm.value.nombre,
    };
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.NivelService.addItem(arrayValues);
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
