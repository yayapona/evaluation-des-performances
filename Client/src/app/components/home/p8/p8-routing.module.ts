import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { P8Component } from './p8.component';

const routes: Routes = [
  {
    path: '', component: P8Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class P8RoutingModule { }
