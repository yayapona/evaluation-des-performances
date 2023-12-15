import {  NO_ERRORS_SCHEMA, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from '../home/home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ConfirmationPopoverModule } from "angular-confirmation-popover";
import { P1Component } from './p1/p1.component';
import { P2Component } from './p2/p2.component';
import { P3Component } from './p3/p3.component';
import { P4Component } from './p4/p4.component';
import { P5Component } from './p5/p5.component';
import { P6Component } from './p6/p6.component';
import { P7Component } from './p7/p7.component';
import { P8Component } from './p8/p8.component';


@NgModule({
  declarations: [

    P1Component,
    P2Component,
    P3Component,
    P4Component,
    P6Component,
    P7Component,
    P8Component
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    Ng2SearchPipeModule,
    NgxSpinnerModule, 
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    })
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule { }
