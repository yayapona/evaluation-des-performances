import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { P1RoutingModule } from './p1-routing.module';
import { ModalComponent } from './modal/modal.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';




@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    P1RoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NgxSpinnerModule 
  ]
})
export class P1Module { }
