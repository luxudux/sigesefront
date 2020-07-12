import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// MATERIAL
import { AppMaterialModule } from '../material';
// CRUD
import { DelegationListComponent } from './delegation-list/delegation-list.component';
import { DelegationAddComponent } from './delegation-add/delegation-add.component';
import { DelegationUpdateComponent } from './delegation-update/delegation-update.component';
import { DelegationDeleteComponent } from './delegation-delete/delegation-delete.component';

@NgModule({
  declarations: [
    DelegationListComponent,
    DelegationAddComponent,
    DelegationUpdateComponent,
    DelegationDeleteComponent,
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [
    DelegationListComponent,
    DelegationAddComponent,
    DelegationUpdateComponent,
    DelegationDeleteComponent,
  ],
  providers: [
  ],
  entryComponents: [
    DelegationAddComponent,
    DelegationUpdateComponent,
    DelegationDeleteComponent,
  ]
})
export class DelegationModule { }
