import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// MATERIAL
import { AppMaterialModule } from '../material';
// CRUD
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';
// SERVICES
import { ActivoService } from '../services/activo/activo.service';
import { NivelService } from '../services/nivel/nivel.service';
import { TrabajadorService } from '../services/trabajador/trabajador.service';
import { GeneroService } from '../services/genero/genero.service';

@NgModule({
  declarations: [UserListComponent, UserAddComponent, UserUpdateComponent, UserDeleteComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    UserListComponent,
    UserAddComponent,
    UserUpdateComponent,
    UserDeleteComponent,
  ],
  entryComponents: [
    UserAddComponent,
    UserUpdateComponent,
    UserDeleteComponent,
  ],
  providers: [
    ActivoService,
    NivelService,
    TrabajadorService,
    GeneroService,
  ]
})
export class UserModule { }
