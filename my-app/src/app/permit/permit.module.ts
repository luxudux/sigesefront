import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// MATERIAL
import { AppMaterialModule } from '../material';
// CRUD
import { PermitAddComponent } from './permit-add/permit-add.component';
import { PermitDeleteComponent } from './permit-delete/permit-delete.component';
import { PermitListComponent } from './permit-list/permit-list.component';
import { PermitUpdateComponent } from './permit-update/permit-update.component';

@NgModule({
  declarations: [
    PermitAddComponent,
    PermitDeleteComponent,
    PermitListComponent,
    PermitUpdateComponent,
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    PermitAddComponent,
    PermitDeleteComponent,
    PermitListComponent,
    PermitUpdateComponent,
  ],
  entryComponents: [
    PermitAddComponent,
    PermitDeleteComponent,
    PermitUpdateComponent,
  ]
})
export class PermitModule { }
