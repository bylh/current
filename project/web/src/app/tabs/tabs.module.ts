import { AppMaterialModule } from './../app-shared.module';
import { ToolsModule } from './../tools/tools.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsRoutingModule } from './tabs-routing.module';
import { TabsComponent } from './tabs.component';
import { ProfileModule } from '../profile/profile.module';

@NgModule({
  imports: [
    CommonModule,
    TabsRoutingModule,
    ToolsModule,
    ProfileModule,
    AppMaterialModule
  ],
  declarations: [TabsComponent]
})
export class TabsModule { }
