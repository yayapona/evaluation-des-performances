import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomaineService } from 'src/app/core/service/domaine.service';
import { CritereService } from 'src/app/core/service/critere.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContratService } from 'src/app/core/service/contrat.service';
import { ToastrService } from 'ngx-toastr';
import { contratModel } from 'src/app/model/contrat';
import { agentModel } from 'src/app/model/agent';
import { ModalComponent } from './modal/modal.component';
import { ModalEvaluationComponent } from './modal-evaluation/modal-evaluation.component';
import { take } from 'rxjs';


@Component({      
  selector: 'app-p4',
  templateUrl: './p4.component.html',
  styleUrls: ['./p4.component.css']
})
export class P4Component implements OnInit {

  domaineList: any[] = [];
  critereListByDomaine: any[] = [];
  data1: any[] = [];
  data2: any [] = [];
  data3: any [] = [];
  data4: any [] = [];
  data5: any [] = [];
  data6: any [] = [];
  data7: any ;
  modalRef?: BsModalRef;
  contrat = new contratModel();
  agent = new agentModel();
  empForm: FormGroup;
  booleancontrat: boolean = true


  constructor(
    private modalService: BsModalService,
    private _empServiceD: DomaineService,
    private _empServiceC: CritereService,
    private _empServiceCC: ContratService,
    private spinner : NgxSpinnerService,
    private toast: ToastrService,
    private _fb: FormBuilder
    ) {
      this.empForm = this._fb.group({
        annee_contrat: ['', Validators.required]
      })
    };

  activeTab: number = -1;
  onTabClick(tab: any, listCritere: any){
    this.activeTab = tab;
    console.log(listCritere);
    this.critereListByDomaine = listCritere;
  }; 

  ngOnInit(): void {
    this.getContratByIdAgent()
    this.getAllDomaineList();
    console.log(this.data)
    
  }
  
  data = JSON.parse(localStorage.getItem("donnée")!);
  
  createContrat(){
    this.contrat.matricule_evalue = this.data.matricule;
    this.contrat.estitulaire = "titulaire";
    this.contrat.statut_contrat = "initié";
    this.contrat.annee_contrat = this.empForm.get("annee_contrat")?.value;
    this.contrat.creepar = this.data.nom;
    this.agent.id = this.data.id
    this.contrat.agent = this.agent
    console.log(this.contrat);
    if (this.contrat ) {
      //Ajout contrat
       this._empServiceCC
        .AddContrat(this.contrat)
        .pipe(take(1))
        .subscribe((res) => {
          console.log(res)
            if(res.reponse.code === '202') {
                 console.log('Contrat enregistrée!');
                 this.toast.success("Contrat créé");
                 this.booleancontrat = true;
                 this.data6 = res.data;
                 console.log(this.data6);
                 localStorage.setItem('contrat',JSON.stringify(this.data3))
                 console.log('Success!','Enregistrement effectué avec succès!');
              }else if (res.reponse.code === '500') {
                console.log("enrégistrement échoué!");
                this.toast.error("Création du contrat échoué")
              }
        },
        (error) =>{ console.log('Erreur!','Erreur lors de la saisir des champs requis !');
            console.log("Erreur lors de l'ajout de l'utilisateur !");
            this.toast.error("Création du contrat échoué")
            console.log(error);
          }
        );
    }else{
      console.log('Veuillez renseigner les champs requis !');
      console.log('Erreur', 'Veuillez renseigner les champs requis');
    }
  }


  openModal(params:any) {
    const initialState = {
      itemSelected:params
    }
    this.modalRef = this.modalService.show(ModalComponent,
      {
        initialState,
        class: 'modal-lg'
        //lg xl md
      }
      );
  };
  
  openModalEvaluation(){
    this.modalRef = this.modalService.show(ModalEvaluationComponent);
  }

  
  
  getAllDomaineList(){
    this._empServiceD.getAllDomaineList()
    .pipe(take(1))
    .subscribe(
      (res: any) => {
        if (res.reponse.code === '200') {
          console.log("liste des domaines rétournés!");
          this.data1 = [];
          this.data1 = res.data;
          console.log(this.data1)
        } else {
          console.log("liste non récuperées");
        }
      },
      (error: any) => console.log(error)
    )
   };


   getContratByIdAgent(){
    this.spinner.show()
    this._empServiceCC.getContratByAgent(this.data.id)
    .pipe(take(1))
    .subscribe(
      (res: any) => {
        if (res.reponse.code === '200') {
          console.log("Contrat rétournés!");
          this.domaineList = res.data[0].domaines;
          this.spinner.hide() ; 
          console.log(this.domaineList);

          this.data7 = res.data;
          console.log(this.data7)
        } else {
          console.log("Contrat non récuperés");
        }
      },
      (error: any) => console.log(error)
    )
   };
}
