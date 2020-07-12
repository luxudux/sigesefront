import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MySharedMaterialModule } from './material';
// Components Nav Structure
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavSupDerComponent } from './nav-sup-der/nav-sup-der.component';
import { NavLogoutComponent } from './nav-logout/nav-logout.component';
import { NavSupCenComponent } from './nav-sup-cen/nav-sup-cen.component';
import { NavUnderComponent } from './nav-under/nav-under.component';
// Modules
import { DelegationModule  } from '../delegation/delegation.module';
import { TypeModule  } from '../type/type.module';
import { UserModule } from '../user/user.module';
import { WorkerModule } from '../worker/worker.module';
import { StateModule } from '../state/state.module';
import { PreferenceModule } from '../preference/preference.module';
import { LevelModule } from '../level/level.module';
import { CallModule } from '../call/call.module';
import { ContactModule } from '../contact/contact.module';
import { EventModule } from '../event/event.module';
import { OfficeModule } from '../office/office.module';
import { DocumentModule } from '../document/document.module';
import { ConclutionModule } from '../conclution/conclution.module';
import { PermitModule } from '../permit/permit.module';
import { TownModule } from '../town/town.module';
// Components Perfiles
import { MainSecretaryComponent } from './main-secretary/main-secretary.component';
import { MainManagerComponent } from './main-manager/main-manager.component';
import { MainAdminerComponent } from './main-adminer/main-adminer.component';
// SERVICES
import { PermisoService } from '../services/permiso/permiso.service';
// DIALOG LOADING AND ERROR
import { DialogLoadingComponent } from './dialog-loading/dialog-loading.component';
import { DialogErrorComponent } from './dialog-error/dialog-error.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NavSupDerComponent,
    NavLogoutComponent,
    NavSupCenComponent,
    NavUnderComponent,
    MainSecretaryComponent,
    MainManagerComponent,
    MainAdminerComponent,
    DialogLoadingComponent,
    DialogErrorComponent,
    // DelegationListComponent
  ],
  imports: [
    CommonModule,
    MySharedMaterialModule,
    DelegationModule,
    TypeModule,
    UserModule,
    WorkerModule,
    StateModule,
    PreferenceModule,
    LevelModule,
    CallModule,
    ContactModule,
    EventModule,
    OfficeModule,
    DocumentModule,
    ConclutionModule,
    PermitModule,
    TownModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    NavSupDerComponent,
    NavLogoutComponent,
    NavSupCenComponent,
    NavUnderComponent,
    MainSecretaryComponent,
    MainAdminerComponent,
  ],
  providers: [
    PermisoService,
  ],
  entryComponents: [
    DialogLoadingComponent,
    DialogErrorComponent,
  ]
})
export class SharedModule { }
