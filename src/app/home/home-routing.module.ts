import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [{
      path: ':id',
      component: DetailComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
