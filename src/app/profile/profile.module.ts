import { AppSharedModule } from './../app-shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    AppSharedModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
