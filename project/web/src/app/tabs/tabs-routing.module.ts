import { AuthGuard } from './../auth-guard.service';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsComponent } from './tabs.component';
import { ProfileComponent } from './../profile/profile.component';
import { ToolsComponent } from './../tools/tools.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsComponent,
    // canActivateChild: [AuthGuard],  // 此时登录状态还未初始化结束？
    children: [
      {
        path: 'home',
        loadChildren: '../home/home.module#HomeModule',
        // canLoad: [AuthGuard],
        data: { preload: true, reload: false, path: 'home' }
      },
      {
        path: 'discovery',
        // canLoad: [AuthGuard],
        loadChildren: '../discovery/discovery.module#DiscoveryModule',
        data: { preload: true, reload: false, path: 'discovery' }
      },
      {
        path: 'tools',
        component: ToolsComponent,
        // canActivate: [AuthGuard],
        data: { preload: true, reload: false, path: 'tools' }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { preload: true, reload: false, path: 'profile' }
      }
    ]
  },
  {
    path: 'login',
    component: TabsComponent
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule { }
