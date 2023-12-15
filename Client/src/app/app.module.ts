import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { ModalModule } from "ngx-bootstrap/modal";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { NgxLocalizedNumbers } from "ngx-localized-numbers";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { NgConfirmModule } from 'ng-confirm-box';
import { NgSelectModule } from "@ng-select/ng-select";
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationPopoverModule } from "angular-confirmation-popover";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { EmitterDataService } from "./utils/emitter-data.service";
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ModalComponent } from './components/home/p1/modal/modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    SweetAlert2Module.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    ToastrModule.forRoot(), 
    NgSelectModule,
    NgxSpinnerModule,
    NgxLocalizedNumbers.forRoot(),
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgConfirmModule,
    NgxPermissionsModule.forRoot(),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    })
    
  ],
  providers: [NgxSpinnerService,EmitterDataService, {provide: BsModalService}],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent],
})
export class AppModule { }
