import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { P2Component } from './p2.component' 

const routes: Routes = [
  {
    path:'', 
    component: P2Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class P2RoutingModule { }
