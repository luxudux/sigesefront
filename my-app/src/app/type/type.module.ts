import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// MATERIAL
import { AppMaterialModule } from '../material';
// CRUD
import { TypeAddComponent } from './type-add/type-add.component';
import { TypeDeleteComponent } from './type-delete/type-delete.component';
import { TypeListComponent } from './type-list/type-list.component';
import { TypeUpdateComponent } from './type-update/type-update.component';




@NgModule({
  declarations: [
    TypeAddComponent,
    TypeDeleteComponent,
    TypeListComponent,
    TypeUpdateComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [
    TypeListComponent,
    TypeAddComponent,
    TypeUpdateComponent,
    TypeDeleteComponent,
  ],
  providers: [
  ],
  entryComponents: [
    TypeAddComponent,
    TypeUpdateComponent,
    TypeDeleteComponent,
  ]
})
export class TypeModule { }
