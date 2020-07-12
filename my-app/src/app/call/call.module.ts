import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// MATERIAL
import { AppMaterialModule } from '../material';
// CRUD
import { CallListComponent } from './call-list/call-list.component';
import { CallAddComponent } from './call-add/call-add.component';
import { CallUpdateComponent } from './call-update/call-update.component';
import { CallDeleteComponent } from './call-delete/call-delete.component';
// DATE
import { MAT_DATE_LOCALE } from '@angular/material/core';
// TIMEPICKER
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
  declarations: [CallListComponent, CallAddComponent, CallUpdateComponent, CallDeleteComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaterialTimepickerModule,
  ],
  exports: [
    CallListComponent,
    CallAddComponent,
    CallUpdateComponent,
    CallDeleteComponent,
  ],
  entryComponents: [
    CallAddComponent,
    CallUpdateComponent,
    CallDeleteComponent,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ]
})
export class CallModule { }
