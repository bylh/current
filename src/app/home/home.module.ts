import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AppMaterialModule } from '../app-material.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    AppMaterialModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
