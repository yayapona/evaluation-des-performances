import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { P4RoutingModule } from './p4-routing.module';
import { ModalComponent } from './modal/modal.component';
import { ModalEvaluationComponent } from './modal-evaluation/modal-evaluation.component';
import { EditModalObjectifComponent } from './modal/edit-modal-objectif/edit-modal-objectif.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    ModalComponent,
    ModalEvaluationComponent,
    EditModalObjectifComponent
  ],
  imports: [
    CommonModule,
    P4RoutingModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class P4Module { }
