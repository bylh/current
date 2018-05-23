// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @NgModule({
//   imports: [
//     CommonModule
//   ],
//   declarations: []
// })
// export class AppRoutingModule { }



import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';

import { TypePageComponent }  from './views/type-page/type-page.component';
import { CartComponent }      from './views/cart/cart.component';
import { OrderComponent}      from './views/order/order.component';
import { PayBillComponent}        from './views/pay-bill/pay-bill.component';

const routes: Routes = [
  { path: '', redirectTo: '/goods', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  // { path: 'cart/:id', component: CartComponent },
  { path: 'cart/:goods_id/:goods_name/:shop_price',  component: CartComponent },
  { path: 'order/order', component: OrderComponent },
  { path: 'pay-bill/:money', component: PayBillComponent },

  { path: 'heroes', component: HeroesComponent },
  { path: 'goods', component: TypePageComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
