import { AppReuseStrategy } from './app-reuse-strategy';

import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouteReuseStrategy } from '@angular/router';
import { ToolsComponent } from './tools/tools.component';
import { ProfileComponent } from './profile/profile.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    // component: HomeComponent
    loadChildren: './home/home.module#HomeModule',
    data: { preload: true, reload: false, path: 'home' }
  },
  {
    path: 'discovery',
    loadChildren: './discovery/discovery.module#DiscoveryModule',
    data: { preload: true, reload: false, path: 'discovery' }
  },
  {
    path: 'tools',
    component: ToolsComponent,
    data: { preload: true, reload: false, path: 'tools' }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { preload: true, reload: false, path: 'profile' }
  }
];
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
  providers: [{ provide: RouteReuseStrategy, useClass: AppReuseStrategy }]
})
export class AppRoutingModule { }
