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
      // data: {reload: false, path: 'detail/:id'}
    }]
  },
  {
    path: 'test',
    component: DetailComponent,
    // data: { reload: false, path: 'test' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
