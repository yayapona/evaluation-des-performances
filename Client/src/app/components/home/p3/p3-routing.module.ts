import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { P3Component } from './p3.component';


const routes: Routes = [
  {
    path:'', 
    component:   P3Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class P3RoutingModule { }
