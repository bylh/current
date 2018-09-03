
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsRoutingModule } from './tabs-routing.module';
import { TabsComponent } from './tabs.component';
import { ToolsModule } from '../tools/tools.module';
import { ProfileModule } from '../profile/profile.module';
import { AppSharedModule } from '../app-shared.module';

@NgModule({
  imports: [
    CommonModule,
    TabsRoutingModule,
    ToolsModule,
    ProfileModule,
    AppSharedModule,
  ],
  declarations: [TabsComponent]
})
export class TabsModule { }
