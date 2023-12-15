import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { P6RoutingModule } from './p6-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditModalIndicateurComponent } from './edit-modal-indicateur/edit-modal-indicateur.component';
import { EditModalOccurenceComponent } from './edit-modal-occurence/edit-modal-occurence.component';
import { EditModalPreuveComponent } from './edit-modal-preuve/edit-modal-preuve.component';


@NgModule({
  declarations: [
   
    EditModalIndicateurComponent,
    EditModalOccurenceComponent,
    EditModalPreuveComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    P6RoutingModule
  ]
})
export class P6Module { }
