import { Component, OnInit } from '@angular/core';
import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';
import { take } from 'rxjs';
import { AgentService } from 'src/app/core/service/agent.service';
import { ContratService } from 'src/app/core/service/contrat.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-p7',
  templateUrl: './p7.component.html',
  styleUrls: ['./p7.component.css']
})
export class P7Component implements OnInit {
   
   data: any [] = [];
   data2: any [] = [];
   data3: any [] = [];
   bsmodalRef!:BsModalRef;
   showCollaborateurs!: any;
   hideCollaborateurs!:true;
   constructor(
    private _empService: AgentService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService

   ){};

   ngOnInit() {
     console.log(this.data1);
     this.getAllColloborateurs();
   }
   
   data1 = JSON.parse(localStorage.getItem("donnée")!);
  

   getAllColloborateurs(){
    this.spinner.show(); 
    this._empService.getAllCollaborateurs(this.data1.matricule)
    .pipe(take(1))
    .subscribe(
      (res: any) => {
        if (res.reponse.code === '200') {
          console.log("liste des collaborateurs rétournés!");
          this.data = [];
          this.data = res.data;
          this.spinner.hide();
          this.data.length !== 0 ? this.showCollaborateurs = true : this.hideCollaborateurs = true
          console.log(this.data)
        } else {
          this.spinner.hide();
          console.log("liste non récuperées");
        }
      },
      (error: any) => console.log(error)
    )
   };
   
  

   showModal(params: number){
    const initialState = {
      itemSelected: params
    }
    this.bsmodalRef = this.modalService.show(ModalComponent, 
      {
        initialState,
        class: 'modal-lg'
      }
      )
   };
}
