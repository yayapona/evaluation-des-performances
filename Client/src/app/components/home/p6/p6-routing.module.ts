import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { P6Component } from './p6.component';

const routes: Routes = [
  {
    path:'',
    component:P6Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class P6RoutingModule { }
