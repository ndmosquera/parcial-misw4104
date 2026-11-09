import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CafeModule } from './cafe/cafe.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CafeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
