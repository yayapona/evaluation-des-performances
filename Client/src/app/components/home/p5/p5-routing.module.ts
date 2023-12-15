import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { P5Component } from './p5.component';

const routes: Routes = [
  {
    path:'',
    component:P5Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class P5RoutingModule { }
