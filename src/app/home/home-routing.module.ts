import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { DetailComponent } from './detail/detail.component';
import { CanDeactivateGuard } from '../can-deactivate-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'detail/:id',
        component: DetailComponent,
        // canDeactivate: [CanDeactivateGuard],
        // resolve: {
        //   crisis: CrisisDetailResolver
        // }
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
