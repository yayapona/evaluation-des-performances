import { Component } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContratService } from 'src/app/core/service/contrat.service';
import { ToastrService } from 'ngx-toastr';
import { contratModel } from 'src/app/model/contrat';
import { agentModel } from 'src/app/model/agent';
import { take } from 'rxjs';


@Component({
  selector: 'app-modal-evaluation',
  templateUrl: './modal-evaluation.component.html',
  styleUrls: ['./modal-evaluation.component.css']
})
export class ModalEvaluationComponent {
  
  data3: any
  empForm: FormGroup;
  contrat = new contratModel();
  agent = new agentModel();

  constructor(
    private modalService: BsModalService,
    private _empServiceCC: ContratService,
    private toast: ToastrService,
    private _fb: FormBuilder
    ) {
      this.empForm = this._fb.group({
        annee_contrat: ['', Validators.required]
      })
    };

  data = JSON.parse(localStorage.getItem("donnne")!);

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
                 this.data3 = res.data;
                 console.log(this.data3);
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
  };
}
