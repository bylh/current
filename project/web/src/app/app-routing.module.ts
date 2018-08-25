import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
import { AppReuseStrategy } from './app-reuse-strategy';

import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouteReuseStrategy } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/tabs', pathMatch: 'full' },
  {
    path: 'tabs',
    loadChildren: './tabs/tabs.module#TabsModule',
    // data: { preload: false}
  },
  {
    path: 'home',
    // component: TabsComponent,
    loadChildren: './home/home.module#HomeModule',
    // data: { preload: false}
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: SelectivePreloadingStrategy,
  })],
  providers: [SelectivePreloadingStrategy, { provide: RouteReuseStrategy, useClass: AppReuseStrategy }]
})
export class AppRoutingModule { }
