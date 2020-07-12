import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// MATERIAL
import { AppMaterialModule } from '../material';
// CRUD
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactUpdateComponent } from './contact-update/contact-update.component';
import { ContactDeleteComponent } from './contact-delete/contact-delete.component';

@NgModule({
  declarations: [ContactListComponent, ContactAddComponent, ContactUpdateComponent, ContactDeleteComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    ContactListComponent,
    ContactAddComponent,
    ContactUpdateComponent,
    ContactDeleteComponent,
  ],
  entryComponents: [
    ContactAddComponent,
    ContactUpdateComponent,
    ContactDeleteComponent,
  ],
  providers: [

  ]
})
export class ContactModule { }
