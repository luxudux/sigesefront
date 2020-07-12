import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// MATERIAL
import { AppMaterialModule } from '../material';
// CRUD
import { WorkerListComponent } from './worker-list/worker-list.component';
import { WorkerAddComponent } from './worker-add/worker-add.component';
import { WorkerDeleteComponent } from './worker-delete/worker-delete.component';
import { WorkerUpdateComponent } from './worker-update/worker-update.component';
// SERVICES
import { ActivoService } from '../services/activo/activo.service';
import { GeneroService } from '../services/genero/genero.service';

@NgModule({
  declarations: [WorkerListComponent, WorkerAddComponent, WorkerDeleteComponent, WorkerUpdateComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    WorkerListComponent,
    WorkerAddComponent,
    WorkerDeleteComponent,
    WorkerUpdateComponent,
  ],
  providers: [
    ActivoService,
    GeneroService,
  ],
  entryComponents: [
    WorkerAddComponent,
    WorkerDeleteComponent,
    WorkerUpdateComponent,
  ]
})
export class WorkerModule { }
