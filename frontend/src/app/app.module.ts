import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CovalentDialogsModule } from '@covalent/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from '@app/app.component';
import { GraphQLModule } from '@app/graphql.module';
import { MaterialModule } from '@app/material.module';
import { CarsModule } from '@app/cars/cars.module';
import 'hammerjs';

const routes: Routes = [
  {path: '', redirectTo: '/cars', pathMatch: 'full'},
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    CovalentDialogsModule,
    RouterModule.forRoot(routes),
    GraphQLModule,
    MaterialModule,
    CarsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
