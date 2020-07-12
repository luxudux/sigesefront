import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
// INTERFACE AND SERVICE DELEGACION
import { ConclusionInterface } from '../../services/conclusion/conclusion-interface';
import { ConclusionService } from '../../services/conclusion/conclusion.service';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from '../../shared/dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from '../../shared/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
// EMITIR EVENTO
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-conclution-add',
  templateUrl: './conclution-add.component.html',
  styleUrls: ['./conclution-add.component.css']
})
export class ConclutionAddComponent implements OnInit {

  // VALIDACIONES
  updateNombreMax = 50;
  updateIconoMax = 20;
  updateColorMax = 35;

  public title: string;
  public grupoForm: FormGroup;
  // Loading and error
  loadingDialogRef: any;
  errorDialogRef: any;

  @Output() addFine = new EventEmitter<any>();

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    public ConclusionService: ConclusionService,
    private dialogRef: MatDialogRef<ConclutionAddComponent>,
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
        Validators.pattern('^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\\s\-\.\%]*$'),
      ]),
      icono: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.updateIconoMax),
        Validators.pattern('^[0-9a-zA-Z\\s\-\.\_]*$'),
      ]),
      color: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.updateColorMax),
        Validators.pattern('^[0-9a-zA-Z\\s\-\.\#]*$'),
      ]),

    });
  }

  createResource() {
    console.log('Creando');

    const arrayValues: ConclusionInterface = {
      name: this.grupoForm.value.nombre,
      icon: this.grupoForm.value.icono,
      color_icon: this.grupoForm.value.color,
    };
    this.loadingDialogRef = this.dialog.open(
      DialogLoadingComponent, { panelClass: 'transparent', disableClose: true });

    const result = this.ConclusionService.addItem(arrayValues);
    result.then((response) => {
      // console.log(response);
      if (response) {
        this.addFine.emit(response); // Emitiendo evento
        this.dialogRef.close(); // Close and refresh
        this.loadingDialogRef.close();
      } else {
        console.log(response);
        this.dialogRef.close(); // Close and refresh
        this.loadingDialogRef.close();
        this.errorDialogRef = this.dialog.open(
          DialogErrorComponent, { disableClose: true });
      }
    });
  }
}
