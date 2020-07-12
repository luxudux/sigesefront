import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// MATERIAL
import { AppMaterialModule } from '../material';
// CRUD
import { TownAddComponent } from './town-add/town-add.component';
import { TownUpdateComponent } from './town-update/town-update.component';
import { TownDeleteComponent } from './town-delete/town-delete.component';
import { TownListComponent } from './town-list/town-list.component';

@NgModule({
  declarations: [
    TownAddComponent,
    TownUpdateComponent,
    TownDeleteComponent,
    TownListComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [
    TownAddComponent,
    TownUpdateComponent,
    TownDeleteComponent,
    TownListComponent
  ],
  providers: [
  ],
  entryComponents: [
    TownAddComponent,
    TownUpdateComponent,
    TownDeleteComponent,
  ],
})
export class TownModule { }
