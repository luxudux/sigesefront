import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// RECEIVED CRUD
import { DocumentListReceivedComponent } from './received/document-list-received/document-list-received.component';
import { DocumentNotifiedComponent } from './received/document-notified/document-notified.component';
import { DocumentOpenComponent } from './received/document-open/document-open.component';
// ELABORATED CRUD
import { DocumentListElaboratedComponent } from './elaborated/document-list-elaborated/document-list-elaborated.component';
import { DocumentAddComponent } from './elaborated/document-add/document-add.component';
import { DocumentUpdateComponent } from './elaborated/document-update/document-update.component';
import { DocumentDeleteComponent } from './elaborated/document-delete/document-delete.component';
import { DocumentSentComponent } from './elaborated/document-sent/document-sent.component';
import { DocumentFileComponent } from './elaborated/document-file/document-file.component';
// NOTIFIED CRUD
import { DocumentListNotifiedComponent } from './notified/document-list-notified/document-list-notified.component';
import { DocumentExecutedComponent } from './notified/document-executed/document-executed.component';
// EXECUTED CRUD
import { DocumentListExecutedComponent } from './executed/document-list-executed/document-list-executed.component';
import { DocumentFinishedComponent } from './executed/document-finished/document-finished.component';
// SENT CRUD
import { DocumentListSentComponent } from './sent/document-list-sent/document-list-sent.component';
// FINISHED CRUD
import { DocumentListFinishedComponent } from './finished/document-list-finished/document-list-finished.component';
// MATERIAL CRUD
import { AppMaterialModule } from '../material';
// DATE
import { MAT_DATE_LOCALE } from '@angular/material/core';
// TIMEPICKER
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DocumentToSentComponent } from './sent/document-to-sent/document-to-sent.component';
import { DocumentStateSentComponent } from './sent/document-state-sent/document-state-sent.component';
import { DocumentListInboxComponent } from './inbox/document-list-inbox/document-list-inbox.component';
import { DocumentReceivedComponent } from './inbox/document-received/document-received.component';


@NgModule({
  declarations: [
    DocumentListReceivedComponent,
    DocumentListElaboratedComponent,
    DocumentListNotifiedComponent,
    DocumentListExecutedComponent,
    DocumentListSentComponent,
    DocumentNotifiedComponent,
    DocumentFinishedComponent,
    DocumentExecutedComponent,
    DocumentOpenComponent,
    DocumentListFinishedComponent,
    DocumentAddComponent,
    DocumentUpdateComponent,
    DocumentDeleteComponent,
    DocumentSentComponent,
    DocumentFileComponent,
    DocumentToSentComponent,
    DocumentStateSentComponent,
    DocumentListInboxComponent,
    DocumentReceivedComponent,
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaterialTimepickerModule,
  ],
  exports: [
    DocumentListReceivedComponent,
    DocumentNotifiedComponent,
    DocumentOpenComponent,
    DocumentListElaboratedComponent,
    DocumentAddComponent,
    DocumentUpdateComponent,
    DocumentDeleteComponent,
    DocumentSentComponent,
    DocumentFileComponent,
    DocumentListNotifiedComponent,
    DocumentExecutedComponent,
    DocumentListExecutedComponent,
    DocumentFinishedComponent,
    DocumentListSentComponent,
    DocumentListFinishedComponent,
    DocumentStateSentComponent,
    DocumentListInboxComponent,
    DocumentReceivedComponent,
  ],
  entryComponents: [
    DocumentNotifiedComponent,
    DocumentFinishedComponent,
    DocumentExecutedComponent,
    DocumentOpenComponent,
    DocumentAddComponent,
    DocumentUpdateComponent,
    DocumentDeleteComponent,
    DocumentSentComponent,
    DocumentFileComponent,
    DocumentToSentComponent,
    DocumentStateSentComponent,
    DocumentReceivedComponent,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ]
})
export class DocumentModule { }
