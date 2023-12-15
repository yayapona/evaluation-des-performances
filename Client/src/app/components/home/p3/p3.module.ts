import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { P3RoutingModule } from './p3-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModaleditAnneeComponent } from './modaledit-annee/modaledit-annee.component';
import { ModaleditDomaineComponent } from './modaledit-domaine/modaledit-domaine.component';
import { ModaleditCritereComponent } from './modaledit-critere/modaledit-critere.component';


@NgModule({
  declarations: [
    ModaleditAnneeComponent,
    ModaleditDomaineComponent,
    ModaleditCritereComponent
  ],
  imports: [
    CommonModule,
    P3RoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class P3Module { }
