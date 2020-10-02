import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Layout2Component } from './components/layout/layout2.component';


const routes: Routes = [
  {
    path: '',
    component: Layout2Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Dashboard2RoutingModule { }
