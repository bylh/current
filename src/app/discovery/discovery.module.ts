import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscoveryRoutingModule } from './discovery-routing.module';
import { DiscoveryComponent } from './discovery.component';
import { DiscoveryDetailComponent } from './discovery-detail/discovery-detail.component';

@NgModule({
  imports: [
    CommonModule,
    DiscoveryRoutingModule
  ],
  declarations: [DiscoveryComponent, DiscoveryDetailComponent]
})
export class DiscoveryModule { }
