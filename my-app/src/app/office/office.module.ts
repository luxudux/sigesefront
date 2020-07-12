import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// MATERIAL
import { AppMaterialModule } from '../material';
// CRUD
import { OfficeListComponent } from './office-list/office-list.component';
import { OfficeAddComponent } from './office-add/office-add.component';
import { OfficeUpdateComponent } from './office-update/office-update.component';
import { OfficeDeleteComponent } from './office-delete/office-delete.component';
// SERVICES
import { DelegacionService } from '../services/delegacion/delegacion.service';

@NgModule({
  declarations: [OfficeListComponent, OfficeAddComponent, OfficeUpdateComponent, OfficeDeleteComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    OfficeListComponent,
    OfficeAddComponent,
    OfficeUpdateComponent,
    OfficeDeleteComponent,
  ],
  entryComponents: [
    OfficeAddComponent,
    OfficeUpdateComponent,
    OfficeDeleteComponent,
  ],
  providers: [
    DelegacionService,
  ]
})
export class OfficeModule { }
