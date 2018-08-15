
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolsRoutingModule } from './tools-routing.module';
import { ToolsComponent } from './tools.component';
import { AppMaterialModule } from '../app-shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ToolsRoutingModule,
    AppMaterialModule,
    FormsModule
  ],
  declarations: [ToolsComponent]
})
export class ToolsModule { }
