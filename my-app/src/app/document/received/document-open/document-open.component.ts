import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-document-open',
  templateUrl: './document-open.component.html',
  styleUrls: ['./document-open.component.css']
})
export class DocumentOpenComponent implements OnInit {

  title: string;
  deleteNo: number;
  deleteTema: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    // console.log(data);
    this.deleteNo = data.id;
    this.deleteTema = data.subject;
    this.title = 'Visualizar registro';
  }

  ngOnInit() {

  }

}
