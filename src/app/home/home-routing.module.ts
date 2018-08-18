import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [{
      path: 'detail/:id',
      component: DetailComponent,
    }]
  },
  {
    path: 'test', 
    component: DetailComponent,
    data: {
      reload: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
