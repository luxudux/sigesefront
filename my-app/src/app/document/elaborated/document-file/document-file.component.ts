import { Component, OnInit } from '@angular/core';
// import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-document-file',
  templateUrl: './document-file.component.html',
  styleUrls: ['./document-file.component.css']
})
export class DocumentFileComponent implements OnInit {

  sentNo: number;
  sentTema: string;
  sentExpiracion: string;

  public title: string;
  public adjuntarBtn: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DocumentFileComponent>
  ) {
    this.sentNo = data.id;
    this.sentTema = data.subject;
    this.sentExpiracion = data.expiration;
    this.title = 'Adjuntar archivo';
    this.adjuntarBtn = true;
  }
  ngOnInit() {

  }
  onUpload(e) {
    if (e.target.files && e.target.files.length > 0) {
      // console.log('subir: ', e);
      // console.log('target: ', e.target);
      // console.log('target: ', e.target.files[0]);
      const idName = Math.random().toString(36).substring(2);
      const file = e.target.files[0];
      const filePath = 'uplodad/documentos';

      console.log(file);
      console.log('NOMBRE:' + file.name);
      console.log('TAMAÑO:' + file.size);
      console.log('TIPO: ' + file.type);

      this.adjuntarBtn = false;
    } else {
      this.adjuntarBtn = true;
    }

  }
}
