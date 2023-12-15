import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { P5RoutingModule } from './p5-routing.module';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import { P5Component } from './p5.component';


@NgModule({
  declarations: [
    P5Component 
  ],
  imports: [
    CommonModule,
    P5RoutingModule,
    NgxPermissionsModule
  ],
  exports:[
    P5Component
  ]
  
})
export class P5Module { }
