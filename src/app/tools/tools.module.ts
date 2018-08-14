import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolsRoutingModule } from './tools-routing.module';
import { ToolsComponent } from './tools.component';

@NgModule({
  imports: [
    CommonModule,
    ToolsRoutingModule
  ],
  declarations: [ToolsComponent]
})
export class ToolsModule { }
