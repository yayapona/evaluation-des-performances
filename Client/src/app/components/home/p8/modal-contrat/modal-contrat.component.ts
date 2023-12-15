import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContratService } from 'src/app/core/service/contrat.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { contratModel } from 'src/app/model/contrat';
import { agentModel } from 'src/app/model/agent';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { take } from 'rxjs';


@Component({
  selector: 'app-modal-contrat',
  templateUrl: './modal-contrat.component.html',
  styleUrls: ['./modal-contrat.component.css']
})
export class ModalContratComponent {
  
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  data3: any [] = [];
  empForm!: FormGroup;
  contrat = new contratModel();
  agent = new agentModel();
  constructor(
    private _fb: FormBuilder,
    private _empService: ContratService,
    private toast: ToastrService,
    public bsModalRef: BsModalRef,
    private spinner : NgxSpinnerService
   
  ){
    this.empForm = this._fb.group({
      annee_contrat: ['', Validators.required],
      titulaire: ['', Validators.required]
    })

  };

  data  = JSON.parse(localStorage.getItem("donnée")!);

  CreateContrat(){
    this.contrat.matricule_evalue = this.data.matricule;
    this.contrat.estitulaire = this.empForm.get("titulaire")?.value;
    this.contrat.statut_contrat = "initié";
    this.contrat.annee_contrat = this.empForm.get("annee_contrat")?.value;
    this.contrat.creepar = this.data.nom;
    this.agent.id = this.data.id
    this.contrat.agent = this.agent
    console.log(this.contrat);

    if (this.contrat ) {
      this.spinner.show()
      //Ajout contrat
       this._empService
        .AddContrat(this.contrat)
        .pipe(take(1))
        .subscribe((res) => {
          console.log(res)
            if(res.reponse.code === '202') {
                 console.log('Contrat enregistrée!');
                 this.toast.success("Contrat créé avec succès");
                 this.data3 = res.data;
                 console.log(this.data3);
                 localStorage.setItem('contrat',JSON.stringify(this.data3))
                 this.passEntry.emit(true);
                 this.bsModalRef.hide()
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

    closeModal(){
      this.bsModalRef.hide()
    }
}
