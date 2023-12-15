import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { indicateurModel } from 'src/app/model/indicateur';
import { occurenceModel } from 'src/app/model/occurence';
import { preuveModel } from 'src/app/model/preuve';
import { IndicateurService } from 'src/app/core/service/indicateur.service';
import { OccurenceService } from 'src/app/core/service/occurence.service';
import { PreuveService } from 'src/app/core/service/preuve.service';
import { EditModalIndicateurComponent } from './edit-modal-indicateur/edit-modal-indicateur.component';
import { EditModalOccurenceComponent } from './edit-modal-occurence/edit-modal-occurence.component';
import { EditModalPreuveComponent } from './edit-modal-preuve/edit-modal-preuve.component';


@Component({
  selector: 'app-p6',
  templateUrl: './p6.component.html',
  styleUrls: ['./p6.component.css']
})
export class P6Component implements OnInit {
   
  data1: any[] = [];
  data2: any [] = [];
  data3: any [] = [];
  empForm!: FormGroup;
  empFormO!: FormGroup;
  empFormp!: FormGroup;
  modalRef?: BsModalRef;


  indicateur = new indicateurModel();
  occurence = new occurenceModel();
  preuve = new preuveModel();
  activeTab:string = 'Personal Details';

  onTabClick(tab: string){
    this.activeTab = tab;
  };

  constructor(
    private _fb: FormBuilder,
    private _empService: IndicateurService,
    private _empServiceO: OccurenceService,
    private _empServiceP: PreuveService,
    private modalService: BsModalService,
    private toastr: ToastrService, 
    private spinner: NgxSpinnerService 
    
  ){
    this.empForm = this._fb.group({
      libelle_indicateur: ['', Validators.required],
    });

    this.empFormO = this._fb.group({
      indicateur_id: ['', Validators.required],
      libelle_occurence : ['', Validators.required],
      note: ['', Validators.required],
    });

    this.empFormp = this._fb.group({
      indicateur_id: ['', Validators.required],
      libelle_preuve: ['', Validators.required],
    

    })
  };
   
  ngOnInit(){
    this.getAllIndicateurList();
    this.getAllOccurence();
    this.getAllPreuve()
  }

  
  onIndicateurSubmit(){
    this.spinner.show()
    this.indicateur.libelle_indicateur = this.empForm.get("libelle_indicateur")?.value ;
    console.log(this.indicateur);
  if (this.indicateur) {
    //Ajout annee
     this._empService
      .AddIndicateur(this.indicateur)
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res)
          if(res.reponse.code === '202') {
               console.log('indicateur enregistré!');
               this.getAllIndicateurList();
               this.spinner.hide() ; 
               this.toastr.success("Indicateurs enregistré avec succès");
               console.log('Success!','Enregistrement effectué avec succès!');
            }else if (res.reponse.code === '500') {
              console.log("enregistrement échoué!");
              this.spinner.hide()
              this.toastr.error(" Erreur serveur, enregistrement échoué")
            }
      },
      (error) =>{ console.log('Erreur!','Erreur lors de la saisir des champs requis !');
          console.log("Erreur lors de l'ajout de l'utilisateur !");
          console.log(error);
          this.spinner.hide()
          this.toastr.error("Enregistrement échoué")

        }
      );
  }else{
    console.log('Veuillez renseigner les champs requis !');
    console.log('Erreur', 'Veuillez renseigner les champs requis');
  }
};

  onOccurenceSubmit(){
    this.indicateur.id = this.empFormO.get("indicateur_id")?.value;
    this.occurence.indicateur = this.indicateur;
    this.occurence.libelle_occurence = this.empFormO.get("libelle_occurence")?.value;
    this.occurence.note = Number(this.empFormO.get("note")?.value) ;
    this.spinner.show();
    console.log(this.occurence);
  if (this.occurence) {
    //Ajout annee
     this._empServiceO
      .AddOccurence(this.occurence)
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res)
          if(res.reponse.code === '200') {
               console.log('Occurence enregistrée avec succès!');
               this.spinner.hide(); 
               this.getAllOccurence() ;
               this.toastr.success("Occurence enregistrée");    
               console.log('Success!','Enregistrement effectué avec succès!');
            }else if (res.reponse.code === '500') {
              console.log("enrégistrement échoué!");
              this.spinner.hide() ;
              this.toastr.error("Erreur serveur, enregistrement échoué")
            }
      },
      (error) =>{ console.log('Erreur!','Erreur lors de la saisir des champs requis !');
          console.log("Erreur lors de l'ajout de l'utilisateur !");
          console.log(error);
          this.spinner.hide() ;
          this.toastr.error("Enregistrement échoué")
        }
      );
  }else{
    console.log('Veuillez renseigner les champs requis !');
    this.spinner.hide() ;
    console.log('Erreur', 'Veuillez renseigner les champs requis');
  }
};


  onPreuveeSubmit(){
    this.spinner.show();
    this.indicateur.id = this.empFormp.get("indicateur_id")?.value;
    this.preuve.indicateur = this.indicateur;
    this.preuve.libelle_preuve = this.empFormp.get("libelle_preuve")?.value;
    console.log(this.preuve);
    if (this.preuve.libelle_preuve.length > 0  ) {
      //Ajout annee
       this._empServiceP
        .AddPreuve(this.preuve)
        .pipe(take(1))
        .subscribe((res) => {
          console.log(res)
            if(res.reponse.code === '202') { 
                 console.log('Preuve de réalisation enregistrée!');   
                 this.getAllPreuve() ; 
                 this.spinner.hide() ;
                 this.toastr.success("Preuve de réalisation enregistrer"); 
                 console.log('Success!','Enregistrement effectué avec succès!');
              }else if (res.reponse.code === '500') {
                console.log("enregistrement échoué!");
                this.spinner.hide() ;
                this.toastr.error("Erreur serveur, enregistrement échoué")
              }
        },
        (error) =>{ console.log('Erreur!','Erreur lors de la saisir des champs requis !');
            console.log("Erreur lors de l'ajout de l'utilisateur !");
            console.log(error);
            this.spinner.hide() ;
            this.toastr.error("Enregistrement échoué")
          }
        );
    }else{
      console.log('Veuillez renseigner les champs requis !');
      this.spinner.hide() ;
      console.log('Erreur', 'Veuillez renseigner les champs requis');
    }
};

   //GET

   getAllIndicateurList(){
    this.spinner.show() ;
    this._empService.getAllIndicateurList()
    .subscribe(
      (res: any) => {
        console.log(res)
        if (res.reponse.code === '200') {
          console.log("liste des indicateurs rétournés!");
          this.data1 = [];
          this.data1 = res.data;
          this.spinner.hide();
          console.log(this.data1)
        } else {
          this.spinner.hide() ;
          console.log("liste non récuperées");
        }
      },
      (error: any) => console.log(error)
    )
   };

   getAllOccurence(){
    this.spinner.show() ;
    this._empServiceO.getAllOccurence()
    .subscribe(
      (res: any) => {
        console.log(res)
        if (res.reponse.code === '200') {
          console.log("liste des occurences rétournés!");
          this.data2 = [];
          this.data2 = res.data;
          this.spinner.hide(); 
          console.log(this.data2)
        } else {
          this.spinner.hide(); 
          console.log("liste non récuperées");
        }
      },
      (error: any) => console.log(error)
    )
   };


   getAllPreuve(){
    this.spinner.show(); 
    this._empServiceP.getAllPreuveList()
    .subscribe(
      (res: any) => {
        console.log(res)
        if (res.reponse.code === '200') {
          console.log("liste des occurences rétournés!");
          this.data3 = [];
          this.data3 = res.data;
          this.spinner.hide()
          console.log(this.data3)
        } else {
          this.spinner.hide()
          console.log("liste non récuperées");
        }
      },
      (error: any) => console.log(error)
    )
   };
  

   deleteIndicateur(id: any){
    let conf = confirm("Voulez-vous supprimer un indicateur?");
    if (conf == false) return;
    this.indicateur.id = id
    this._empService.deleteIndicateur(this.indicateur).subscribe(
      (res: any) => {
        if (res.reponse.code === '200') {
          this.toastr.success("Supression réussie")
          console.log("Suppression de l'indicateur réussi !");
          this.getAllIndicateurList();
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
  };

  deleteOccurence(id: any){
    let conf = confirm("Voulez-vous supprimer une occurence?");
    if (conf == false) return;
    this.occurence.id = id
    this._empServiceO.deleteOccurence(this.occurence).subscribe(
      (res: any) => {
        if (res.reponse.code === '200') {
          this.toastr.success("Supression réussie")
          console.log("Suppression de l'occurence reussi !");
          console.log('Occurence supprimée avec succès', 'succès');
          this.getAllOccurence();
        } else if (res.reponse.code === '500') {
          console.log('Erreur de suppression !');
          console.log("Erreur de suppression");
        }
      },
      (error: any) => console.log(error)
    )
  };

  deletePreuve(id: any){
    let conf = confirm("Voulez-vous supprimer une Preuve de réalisation?");
    if (conf == false) return;
    this.preuve.id = id
    this._empServiceP.deletePreuve(this.preuve).subscribe(
      (res: any) => {
        if (res.reponse.code === '200') {
          this.toastr.success("Supression réussie")
          console.log("Suppression de l'indicateur réussi !");
          this.getAllPreuve();
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
  };

  //MODAL

  openModalIndicateur(id: number){
     const initialState = {
      itemSelected: id
     }
    this.modalRef = this.modalService.show(EditModalIndicateurComponent,
      {
        initialState
      });
    this.modalRef.content.subscribe((res: any)=> {
      if(res){
         this.getAllIndicateurList()
      }
    })
  }
  openModalOccurence(id: number){
    const initialState = {
      itemSelectedO: id
     }
    this.modalRef = this.modalService.show(EditModalOccurenceComponent,
      {
        initialState
      });
    this.modalRef.content.subscribe((res:any) => {
       if(res){
          this.getAllOccurence()
       }
    })
  }
  openModalPreuve(id: number){
    const initialState = {
      itemSelected: id
     }
    this.modalRef = this.modalService.show(EditModalPreuveComponent,
      {
        initialState
      });
    this.modalRef.content.subscribe((res : any )=>{
      if(res){
        this.getAllPreuve()
      }
    })
  }
  
}
