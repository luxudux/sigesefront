import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// MATERIAL
import { AppMaterialModule } from '../material';
// CRUD
import { LevelListComponent } from './level-list/level-list.component';
import { LevelAddComponent } from './level-add/level-add.component';
import { LevelUpdateComponent } from './level-update/level-update.component';
import { LevelDeleteComponent } from './level-delete/level-delete.component';


@NgModule({
  declarations: [LevelListComponent, LevelAddComponent, LevelUpdateComponent, LevelDeleteComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    LevelListComponent,
  ],
  entryComponents: [
    LevelAddComponent,
    LevelUpdateComponent,
    LevelDeleteComponent,
  ],
  providers: [

  ]
})
export class LevelModule { }
