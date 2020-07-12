import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// MATERIAL
import { AppMaterialModule } from '../material';
// CRUD
import { PreferenceListComponent } from './preference-list/preference-list.component';
import { PreferenceAddComponent } from './preference-add/preference-add.component';
import { PreferenceUpdateComponent } from './preference-update/preference-update.component';
import { PreferenceDeleteComponent } from './preference-delete/preference-delete.component';

@NgModule({
  declarations: [PreferenceListComponent, PreferenceAddComponent, PreferenceUpdateComponent, PreferenceDeleteComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    PreferenceListComponent,
    PreferenceAddComponent,
    PreferenceUpdateComponent,
    PreferenceDeleteComponent,
  ],
  entryComponents: [
    PreferenceAddComponent,
    PreferenceUpdateComponent,
    PreferenceDeleteComponent,
  ]
})
export class PreferenceModule { }
