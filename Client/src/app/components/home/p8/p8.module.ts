import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { P8RoutingModule } from './p8-routing.module';
import { ModalContratComponent } from './modal-contrat/modal-contrat.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { ModalViewContratComponent } from './modal-view-contrat/modal-view-contrat.component';
import { P5Module } from '../p5/p5.module';



@NgModule({
    declarations: [
        ModalContratComponent,
        ModalViewContratComponent
    ],
    imports: [
        CommonModule,
        P8RoutingModule,
        ReactiveFormsModule,
        P5Module, 
        NgSelectModule,
        NgxSpinnerModule,
       
    ]
})
export class P8Module { }
