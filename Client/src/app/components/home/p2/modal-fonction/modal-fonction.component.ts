import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { take } from 'rxjs';
import { FonctionService } from 'src/app/core/service/fonction.service';
import { ToastrService } from 'ngx-toastr';
import { fonctionModel } from 'src/app/model/fonction';
import { ModaleditComponent } from '../modaledit/modaledit.component'

@Component({
  selector: 'app-modal-fonction',
  templateUrl: './modal-fonction.component.html',
  styleUrls: ['./modal-fonction.component.css']
})
export class ModalFonctionComponent {
  
  modalRef?: BsModalRef;
  data:any[] = [];
  empForm!: FormGroup; 

  fonction = new fonctionModel();

  constructor(
    private _fb: FormBuilder,
    private _empService: FonctionService,
    private BsModalService: BsModalService,
    private toast: ToastrService,
  ){
    this.empForm = this._fb.group({
      matricule: ['', Validators.required],
      typefonction: ['', Validators.required],
      rang: ['', Validators.required],
      datedebut: ['', Validators.required],
      status: ['', Validators.required],

    })
  };

  onFonctionSubmit(){
    this.fonction.matricule = this.empForm.get("matricule")?.value;
    this.fonction.type_fonction = this.empForm.get("typefonction")?.value;
    this.fonction.statut = Number(this.empForm.get("status")?.value) ;
    this.fonction.rang = Number(this.empForm.get("rang")?.value);
    this.fonction.date_debut = this.empForm.get("datedebut")?.value;
    console.log(this.fonction);
  if (this.fonction.type_fonction.length > 0  ) {
    //Ajout fonction
     this._empService
      .AddFonction(this.fonction)
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res)
       // this.getAllfonction()
          if(res.reponse.code === '202') {
               console.log('Fonction enregistrée!');
               this.toast.success("Fonction de l'agent enrégistrée")
             //  this.resetForm()
            }else if (res.reponse.code === '500') {
              console.log("enrégistrement échoué!");
              this.toast.error("Erreur serveir,enrégistrement échoué")
            }
      },
      (error) =>{ console.log('Erreur!','Erreur lors de la saisir des champs requis !');
          console.log("Erreur lors de l'ajout de l'utilisateur !");
          console.log(error);
          this.toast.error("enrégistrement échoué");
        }
      );
  }else{
    console.log('Veuillez renseigner les champs requis !');
    console.log('Erreur', 'Veuillez renseigner les champs requis');
  }
};

getAllFonction(){
  this._empService.getAllChief()
        .pipe(take(1))
        .subscribe(
          (res: any) => {
            if (res.reponse.code === '200') {
              console.log("liste des fonctions rétournées!");
              console.log(this.data)
            } else {
              console.log("liste non récuperées");
            }
          },
          (error: any) => console.log(error)
        )
};
 editModal(){
    this.modalRef = this.BsModalService.show(ModaleditComponent,
    {
      class:'modal-lg'
    }
      );  
 }
}
