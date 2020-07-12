import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Animations
import { LayoutModule } from '@angular/cdk/layout';
// HTTP
import { HttpClientModule } from '@angular/common/http';
// Material
import { AppMaterialModule } from './material';
// Owns modules
import { SharedModule } from './shared/shared.module';
import { PageModule } from './page/page.module';
import { PublicModule } from './public/public.module';
// SESSION
import { NgxWebstorageModule } from 'ngx-webstorage';
// // TIMEPICKER
// import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    LayoutModule,
    SharedModule,
    PageModule,
    HttpClientModule,
    PublicModule,
    NgxWebstorageModule.forRoot(),
    // NgxMaterialTimepickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
