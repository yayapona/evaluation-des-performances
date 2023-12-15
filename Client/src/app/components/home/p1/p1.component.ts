import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AgentService } from '../../../core/service/agent.service';
import { NgConfirmService } from 'ng-confirm-box';
import { NgxSpinnerService } from 'ngx-spinner';
import { agentModel } from 'src/app/model/agent';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from './modal/modal.component';
import { take } from 'rxjs';


@Component({
  selector: 'app-p1',
  templateUrl: './p1.component.html',
  styleUrls: ['./p1.component.css']
})
export class P1Component implements OnInit {
  
  term!:any
  agent = new agentModel();  
  modalRef?: BsModalRef;
  data: any = [];
  data1: any;

  constructor(
    private modalService: BsModalService,
    private _empService: AgentService,
    private toastr: ToastrService, 
    private spinner : NgxSpinnerService,
    private NgConfirmService : NgConfirmService
    ) {}
  
  ngOnInit() {
    this.getAllAgent();
    this. getNombreAgent();
  }
  openModal() {
    this.modalRef = this.modalService.show(ModalComponent,
      {
        class: 'modal-lg'
        //lg xl md
      });
    this.modalRef.content.passEntry.subscribe((res: any) => {
          if(res){
             this.getAllAgent();
             this.getNombreAgent()
          }
    });

  };

  getAllAgent() {
    this.spinner.show();
    this._empService.getAgentList()
      .pipe(take(1))
      .subscribe(
        (res: any) => {
          if (res.reponse.code === '200') {
            console.log("Liste des agents rétournées!");
            this.data = [];
            this.data = res.data;
            this.spinner.hide();
            console.log(this.data)
          } else {
            console.log("Liste non récuperés");
          }
        },
        (error: any) => console.log(error)
      );
  };

  getNombreAgent() {
    this._empService.getAgentNombre()
      .pipe(take(1))
      .subscribe(
        (res: any) => {
            this.data1 = res.reponse;
            console.log(this.data1)
        },
        (error: any) => console.log(error)
      );
  };

  deleteAgent(id:number){
    let conf = confirm("Voulez-vous supprimer cet agent?");
    if (conf == false) return;
    this.agent.id = id
    this._empService.deleteAgent(this.agent).subscribe(
      (res: any) => {
        if (res.reponse.code === '200') {
          this.toastr.success("Supression réussie")
          console.log("Suppression de l'agent réussi !");
          this.getAllAgent();
          this.getNombreAgent()
        } else if (res.reponse.code === '500') {
          this.toastr.error("Erreur serveur, suppression échouée")
          console.log("Erreur de suppression");
        }
      },
      (error: any) => {
        console.log(error),
        this.toastr.error("Suppression échouée")
      } 
    )
  }
}
