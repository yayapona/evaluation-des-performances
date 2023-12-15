import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { P7RoutingModule } from './p7-routing.module';
import { ModalComponent } from './modal/modal.component';
import { P5Module } from '../p5/p5.module';




@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    P7RoutingModule,
    P5Module


  ]
})
export class P7Module { }
