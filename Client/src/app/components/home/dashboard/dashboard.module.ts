import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { DashboardComponent } from './dashboard.component';
import { ConfirmationPopoverModule } from "angular-confirmation-popover";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { Ng2SearchPipeModule } from "ng2-search-filter";


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgSelectModule,
    NgxSpinnerModule, 
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    })

  ]
})
export class DashboardModule { }
