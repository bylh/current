
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolsRoutingModule } from './tools-routing.module';
import { ToolsComponent } from './tools.component';
import { AppSharedModule } from '../app-shared.module';
import { MovieComponent } from './movie/movie.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  imports: [
    CommonModule,
    ToolsRoutingModule,
    AppSharedModule,
  ],
  declarations: [ToolsComponent, MovieComponent, ChatComponent],
  entryComponents:[ChatComponent] // overlay, dialog必须加这个，否则布局会出现问题
})
export class ToolsModule { }
