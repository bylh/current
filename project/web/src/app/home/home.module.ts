import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AppSharedModule } from '../app-shared.module';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    AppSharedModule,
    FormsModule
  ],
  declarations: [HomeComponent, DetailComponent]
})
export class HomeModule { }
