import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { P4Component } from './p4.component';


const routes: Routes = [
  { 
    path:'',
    component: P4Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class P4RoutingModule { }
