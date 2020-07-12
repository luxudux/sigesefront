import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-error',
  templateUrl: './dialog-error.component.html',
  styleUrls: ['./dialog-error.component.css']
})
export class DialogErrorComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DialogErrorComponent>
  ) { }

  ngOnInit() {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
