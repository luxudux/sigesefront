import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// MATERIAL
import { AppMaterialModule } from '../material';
// CRUD
import { StateListComponent } from './state-list/state-list.component';
import { StateAddComponent } from './state-add/state-add.component';
import { StateUpdateComponent } from './state-update/state-update.component';
import { StateDeleteComponent } from './state-delete/state-delete.component';

@NgModule({
  declarations: [StateListComponent, StateAddComponent, StateUpdateComponent, StateDeleteComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [
    StateListComponent,
    StateAddComponent,
    StateUpdateComponent,
    StateDeleteComponent,
  ],
  entryComponents: [
    StateAddComponent,
    StateUpdateComponent,
    StateDeleteComponent,
  ]
})
export class StateModule { }
