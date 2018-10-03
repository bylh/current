
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AppSharedModule } from '../app-shared.module';
import { DetailComponent } from './detail/detail.component';
import { PreviewEditorComponent } from './preview-editor/preview-editor.component';

@NgModule({
  imports: [
  CommonModule,
    HomeRoutingModule,
    AppSharedModule,
  ],
  declarations: [HomeComponent, DetailComponent, PreviewEditorComponent],
  entryComponents:[PreviewEditorComponent] // dialog必须加这个，否则布局会出现问题
})
export class HomeModule { }
