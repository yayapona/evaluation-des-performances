import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { P7Component } from './p7.component';


const routes: Routes = [
  {
    path:'', component:P7Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class P7RoutingModule { }
