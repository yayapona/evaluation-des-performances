import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalContratComponent } from './modal-contrat/modal-contrat.component';
import { ContratService } from 'src/app/core/service/contrat.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { contratModel } from 'src/app/model/contrat';
import { ModalViewContratComponent } from './modal-view-contrat/modal-view-contrat.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-p8',
  templateUrl: './p8.component.html',
  styleUrls: ['./p8.component.css']
})
export class P8Component implements OnInit {
    
    data1: any[] = [];

    modalRef!: BsModalRef;
    empForm!: FormGroup;
    contrat = new contratModel();
 

    constructor(
      private _fb: FormBuilder,
      private modalService: BsModalService,
      private empService: ContratService,
      private toast: ToastrService,
      private spinner : NgxSpinnerService
    ){};

    ngOnInit() {
      this.getAllContratListeById();
      console.log(this.data2)
    }

    data2 = JSON.parse(localStorage.getItem("donnée")!);

   getAllContratListeById(){
    this.spinner.show()
    this.empService.getAllContratListById(this.data2.id)
    .pipe(take(1))
    .subscribe(
      (res: any) => {
        if (res.reponse.code === '200') {
          console.log(res)
          console.log("liste des contrats rétournés!");
          this.data1 = [];
          this.data1 = res.data;
          console.log(this.data1);
          this.spinner.hide()
        } else {
          this.spinner.hide();
          console.log("liste non récuperées");
        }
      },
      (error: any) => console.log(error)
    )
   };
   showModalContrat(){
      this.modalRef = this.modalService.show(ModalContratComponent);
      this.modalRef.content.passEntry.subscribe((res: any) => {
        this.getAllContratListeById()
      })
   };

   openModalContrat(params: number){
     const initialState = {
          itemSelected: params,
     }

     this.modalRef = this.modalService.show(ModalViewContratComponent,
      { 
        class: 'modal-lg',
        initialState
      });
   }


   updateContratS(id: number){
    this.contrat.id = id;
    this.contrat.statut_contrat = "soumis" ;
    this.contrat.date_soumis = new Date() 
    this.empService
        .updateContrats(this.contrat)
        .pipe(take(1))
        .subscribe((res) => {
          console.log(res)
            if(res.reponse.code === '200') {
                 console.log('Modification enregistrée!');
                 this.toast.success("Contrat soumis");
                // this.getAllAnneeList();
              }else if (res.reponse.code === '500') {
                console.log("Erreur serveur, modification échouée!");
                this.toast.error("Erreur serveur, Modification  échouée");
              }
        },
        (error) =>{ console.log('Erreur!','Erreur lors de la saisir des champs requis !');
            console.log("Erreur lors de l'ajout de l'utilisateur !");
            this.toast.error("Modification échouée");
            console.log(error);
          }
        );
   };

  
   
}
