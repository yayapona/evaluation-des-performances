import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { P2RoutingModule } from './p2-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalFonctionComponent } from './modal-fonction/modal-fonction.component';
import { ModaleditComponent } from './modaledit/modaledit.component';
import { EditModalDirectionComponent } from './edit-modal-direction/edit-modal-direction.component';
import { EditModalSousDirectionComponent } from './edit-modal-sous-direction/edit-modal-sous-direction.component';
import { EditModalServiceComponent } from './edit-modal-service/edit-modal-service.component';
import { NgSelectModule } from "@ng-select/ng-select";




@NgModule({
  declarations: [
    ModalFonctionComponent,
    ModaleditComponent,
    EditModalDirectionComponent,
    EditModalSousDirectionComponent,
    EditModalServiceComponent
  ],
  imports: [
    CommonModule,
    P2RoutingModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class P2Module { }
