import { AppSharedModule } from './../app-shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    AppSharedModule
  ],
  declarations: [ProfileComponent, DialogComponent],
  entryComponents:[DialogComponent]
})
export class ProfileModule { }
