import { ProfileComponent } from './../profile/profile.component';
import { ToolsComponent } from './../tools/tools.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsComponent } from './tabs.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsComponent,
    children: [
      {
        path: 'home',
        outlet: 'home',
        loadChildren: '../home/home.module#HomeModule',
        data: { preload: true, reload: false, path: 'home' }
      },
      {
        path: 'discovery',
        outlet: 'discovery',
        loadChildren: '../discovery/discovery.module#DiscoveryModule',
        data: { preload: true, reload: false, path: 'discovery' }
      },
      {
        path: 'tools',
        outlet: 'tools',
        component: ToolsComponent,
        // data: { preload: true, reload: false, path: 'tools' }
      },
      {
        path: 'profile',
        outlet: 'profile',
        component: ProfileComponent,
        // data: { preload: true, reload: false, path: 'profile' }
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(home:home)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule { }
