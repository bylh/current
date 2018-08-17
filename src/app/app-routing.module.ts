import { DiscoveryComponent } from './discovery/discovery.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ToolsComponent } from './tools/tools.component';
import { ProfileComponent } from './profile/profile.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    // component: HomeComponent
    loadChildren: './home/home.module#HomeModule',
    data: { preload: true }
  },
  {
    path: 'discovery',
    loadChildren: './discovery/discovery.module#DiscoveryModule',
    data: { preload: true }
  },
  { path: 'tools', component: ToolsComponent },
  { path: 'profile', component: ProfileComponent }
];
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
