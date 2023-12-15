import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { P1Component } from '../p1/p1.component'

const routes: Routes = [
  {
    path: '',
    component: P1Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class P1RoutingModule { }
