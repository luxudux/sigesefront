import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
// INTERFACE AND SERVICE DELEGACION
import { NivelInterface } from '../../services/nivel/nivel-interface';
import { NivelService } from '../../services/nivel/nivel.service';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
// EMITIR EVENTO
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-level-update',
  templateUrl: './level-update.component.html',
  styleUrls: ['./level-update.component.css']
})
export class LevelUpdateComponent implements OnInit {

  // VALIDACIONES
  updateNombreMax = 20;

  public title: string;
  public grupoForm: FormGroup;

  updateNo: number;
  updateNombre: string;
  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;

  @Output() updateFine = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // tslint:disable-next-line:no-shadowed-variable
    public NivelService: NivelService,
    private dialogRef: MatDialogRef<LevelUpdateComponent>,
    public dialog: MatDialog,
  ) {
    console.log(data.id);
    this.updateNo = data.id;
    this.updateNombre = data.name;

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

    });
  }

  updateResource(form: any) {
    console.log('Actualizando');
    // console.log(form);
    const arrayValues: NivelInterface = {
      id: this.updateNo,
      name: form.value.nombre,
    };
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.NivelService.updateItem(arrayValues);

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
