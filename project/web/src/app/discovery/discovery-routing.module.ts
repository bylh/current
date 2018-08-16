import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiscoveryComponent } from './discovery.component';
import { DiscoveryDetailComponent } from './discovery-detail/discovery-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DiscoveryComponent,
    children: [ // child方式
      {
        path: ':id',
        component: DiscoveryDetailComponent
      }
    ]
  },
  // { path: 'discovery/:id', component: DiscoveryDetailComponent } // 平行方式，这两种方式只能存在一种
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscoveryRoutingModule { }
