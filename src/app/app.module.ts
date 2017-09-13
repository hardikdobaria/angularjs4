import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { BikeComponent } from './bike/bike.component';
import { BikeService } from './bike/bike.service';




@NgModule({
  declarations: [
    AppComponent,
    BikeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [
    BikeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
