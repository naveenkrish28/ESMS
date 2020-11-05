import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RootComponent } from './components/root/root.component';
import { PagesetupComponent } from './components/pagesetup/pagesetup.component';
import { SectionComponent } from './components/section/section.component';
import { RenderviewComponent } from './components/renderview/renderview.component';
import { DynamicsectionComponent } from './components/dynamicsection/dynamicsection.component';
import { TreeComponent } from './components/tree/tree.component';

const routes: Routes = [
  { path: 'root', component:RootComponent },
  { path: 'page', component:PagesetupComponent },
  { path: 'home', component:HomeComponent },
  { path: 'section', component:SectionComponent },
  { path: 'render', component:RenderviewComponent },  
  { path: 'dynamic', component:DynamicsectionComponent },
  { path: 'tree', component:TreeComponent },
  { path: '',  redirectTo: '/root',    pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
