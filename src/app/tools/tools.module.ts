
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolsRoutingModule } from './tools-routing.module';
import { ToolsComponent } from './tools.component';
import { AppSharedModule } from '../app-shared.module';

@NgModule({
  imports: [
    CommonModule,
    ToolsRoutingModule,
    AppSharedModule,
  ],
  declarations: [ToolsComponent]
})
export class ToolsModule { }
