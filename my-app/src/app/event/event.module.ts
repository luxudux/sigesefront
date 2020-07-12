import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// MATERIAL
import { AppMaterialModule } from '../material';
// CRUD
import { EventListComponent } from './event-list/event-list.component';
import { EventAddComponent } from './event-add/event-add.component';
import { EventUpdateComponent } from './event-update/event-update.component';
import { EventDeleteComponent } from './event-delete/event-delete.component';
// DATE
import { MAT_DATE_LOCALE } from '@angular/material/core';
// TIMEPICKER
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
  declarations: [EventListComponent, EventAddComponent, EventUpdateComponent, EventDeleteComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaterialTimepickerModule,
  ],
  exports: [
    EventListComponent,
    EventAddComponent,
    EventUpdateComponent,
    EventDeleteComponent,
  ],
  entryComponents: [
    EventAddComponent,
    EventUpdateComponent,
    EventDeleteComponent,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ]
})
export class EventModule { }
