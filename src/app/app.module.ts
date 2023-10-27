import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FlightSearchModule } from './flight-search/flight-search.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FlightSearchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
