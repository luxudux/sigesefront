import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// MATERIAL
import { AppMaterialModule } from '../material';
// CRUD
import { ConclutionListComponent } from './conclution-list/conclution-list.component';
import { ConclutionAddComponent } from './conclution-add/conclution-add.component';
import { ConclutionUpdateComponent } from './conclution-update/conclution-update.component';
import { ConclutionDeleteComponent } from './conclution-delete/conclution-delete.component';


@NgModule({
  declarations: [ConclutionListComponent, ConclutionAddComponent, ConclutionUpdateComponent, ConclutionDeleteComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    ConclutionListComponent,
    ConclutionAddComponent,
    ConclutionUpdateComponent,
    ConclutionDeleteComponent,
  ],
  entryComponents: [
    ConclutionAddComponent,
    ConclutionUpdateComponent,
    ConclutionDeleteComponent,
  ],
  providers: [
  ]
})
export class ConclutionModule { }
