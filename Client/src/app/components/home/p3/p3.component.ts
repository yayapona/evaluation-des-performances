import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AnneeService } from 'src/app/core/service/annee.service';
import { DomaineService } from 'src/app/core/service/domaine.service';
import { CritereService } from 'src/app/core/service/critere.service';
import { DirectionService } from 'src/app/core/service/direction.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { anneeModel } from 'src/app/model/annee';
import { domaineModel } from 'src/app/model/domaine';
import { critereModel } from 'src/app/model/critere';
import { directionModel } from 'src/app/model/directionModel';
import { ModaleditAnneeComponent } from './modaledit-annee/modaledit-annee.component';
import { ModaleditDomaineComponent } from './modaledit-domaine/modaledit-domaine.component';
import { ModaleditCritereComponent } from './modaledit-critere/modaledit-critere.component';
@Component({
  selector: 'app-p3',
  templateUrl: './p3.component.html',
  styleUrls: ['./p3.component.css']
})
export class P3Component implements OnInit {


  data: any[] = [];
  data1: any[] = [];
  data2: any [] = [];
  data3: any [] = [];
  empForm!: FormGroup;
  empFormD!: FormGroup;
  empFormC!: FormGroup;
  modalRef?: BsModalRef

  annee = new anneeModel();
  domaine = new domaineModel();
  critere = new critereModel();
  direction = new directionModel()


  constructor(
    private _fb: FormBuilder,
    private _empService: AnneeService,
    private _empServiceD: DomaineService,
    private _empServiceC: CritereService,
    private _empServiceS: DirectionService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner : NgxSpinnerService,

  ){
    this.empForm = this._fb.group({
      annee: ['', Validators.required],
      theme: ['', Validators.required],
      statut: ['', Validators.required]
    });

    this.empFormD = this._fb.group({
      annee_id: ['', Validators.required],
      domaine: ['', Validators.required],
    
    });

    this.empFormC = this._fb.group({
      domaine_id: ['', Validators.required],
      critere: ['', Validators.required],
      direction_id: ['', Validators.required]
    
    })
  };
   
  ngOnInit(){
    this.getAllAnneeList();
    this.getAllDomaineList();
    this.getAllCritereList();
    this.gettAllDirection()
  }

  activeTab:string = 'Personal Details';
  onTabClick(tab: string){
      this.activeTab = tab;
  }

   //Submit
   onAnneeSubmit(){
    this.annee.annee = Number(this.empForm.get("annee")?.value);
    this.annee.theme = this.empForm.get("theme")?.value;
    this.annee.statut = Number(this.empForm.get("statut")?.value);
    console.log(this.annee);
  if (this.annee) {
    //Ajout annee
     this.spinner.show();
     this._empService
      .AddAnnee(this.annee)
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res)
          this.getAllAnneeList()
          if(res.reponse.code === '202') {
               this.spinner.hide();
               this.toastr.success("Année enregistrée");
               console.log('Direction enregistrée!');
            }else if (res.reponse.code === '500') {
              this.spinner.hide();
              console.log("enrégistrement échoué!");
              this.toastr.error("Erreur serveur, enregistrement échoué")
            }
      },
      (error) =>{ console.log('Erreur!','Erreur lors de la saisir des champs requis !');
          console.log("Erreur lors de l'ajout de l'utilisateur !");
          console.log(error);
          this.spinner.hide();
          this.toastr.error("Enregistrement échoué");
        }
      );
  }else{
    console.log('Veuillez renseigner les champs requis !');
    console.log('Erreur', 'Veuillez renseigner les champs requis');
  }
};


onDomaineSubmit(){
  this.annee.id = Number(this.empFormD.get("annee_id")?.value);
  this.domaine.annee = this.annee;
  this.domaine.libelle_domaine = this.empFormD.get("domaine")?.value;
  console.log(this.domaine);
if (this.domaine) {
  //Ajout domaine
   this.spinner.show();
   this._empServiceD
    .AddDomaine(this.domaine)
    .pipe(take(1))
    .subscribe((res) => {
      console.log(res)
      this.getAllDomaineList()
        if(res.reponse.code === '202') {
             console.log('Domaine enregistré!');
             this.spinner.hide();
             this.toastr.success("Domaine enregistré")
             console.log('Success!','Enregistrement effectué avec succès!');
          }else if (res.reponse.code === '500') {
            this.spinner.hide();
            console.log("enrégistrement échoué!");
            this.toastr.error("Enregistrement echoué");
          }
    },
    (error) =>{console.log('Erreur!','Erreur lors de la saisir des champs requis !');
       console.log("Erreur lors de l'ajout de l'utilisateur !");
       console.log(error);
       this.spinner.hide();
       this.toastr.error("Enregistrement echoué");

      }
    );
}else{
  console.log('Veuillez renseigner les champs requis !');
  console.error('Erreur', 'Veuillez renseigner les champs requis');
}
};

onCritereSubmit(){
  this.domaine.id = Number(this.empFormC.get("domaine_id")?.value);
  this.critere.domaine = this.domaine;
  this.direction.id = this.empFormC.get("direction_id")?.value;
  this.critere.direction = this.direction
  this.critere.libelle_critere = this.empFormC.get("critere")?.value;
  console.log(this.critere);
if (this.critere) {
  //Ajout critère
   this.spinner.show();
   this._empServiceC
    .AddCritere(this.critere)
    .pipe(take(1))
    .subscribe((res) => {
      console.log(res)
      this.getAllCritereList();
        if(res.reponse.code === '202') {
             console.log('Critère enregistrée!');
             this.spinner.hide();
             this.toastr.success("Critère enregistré")
             console.log('Success!','Enregistrement effectué avec succès!');
          }else if (res.reponse.code === '500') {
            console.log("enregistrement échoué!");
            this.spinner.hide();
            this.toastr.error("Erreur serveur, enregistrement échoué");

          }
    },
    (error) =>{ console.log('Erreur!','Erreur lors de la saisir des champs requis !');
        console.log("Erreur lors de l'ajout de l'utilisateur !");
        console.log(error);
        this.spinner.hide();
        this.toastr.error("Enregistrement échoué");

      }
    );
}else{
  console.log('Veuillez renseigner les champs requis !');
  console.error('Erreur', 'Veuillez renseigner les champs requis');
}
};

   //Get 

   getAllAnneeList(){
    this.spinner.show();
    this._empService.getAllAnneeList()
    .pipe(take(1))
    .subscribe(
      (res: any) => {
        if (res.reponse.code === '200') {
          this.spinner.hide()
          console.log("liste des années rétournées!");
          this.data = [];
          this.data = res.data;
          this.spinner.hide();
          console.log(this.data)
        } else {
          console.log("liste non récuperées");
        }
      },
      (error: any) => console.log(error)
    )
  };

  getAllDomaineList(){
    this.spinner.show()
    this._empServiceD.getAllDomaineList()
    .pipe(take(1))
    .subscribe(
      (res: any) => {
        if (res.reponse.code === '200') {
          console.log("liste des domaines rétournés!");
          this.data1 = [];
          this.data1 = res.data;
          this.spinner.hide();
          console.log(this.data1)
        } else {
          this.spinner.hide();
          console.log("liste non récuperées");
        }
      },
      (error: any) => console.log(error)
    )
   };

   getAllCritereList(){
    this.spinner.show();
    this._empServiceC.getAllCritereList()
    .subscribe(
      (res: any) => {
        if (res.reponse.code === '200') {
          console.log("liste des critères rétournés!");
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


   gettAllDirection(){
    this._empServiceS.getAllDirectionList()
    .subscribe(
      (res: any) => {
        if (res.reponse.code === '200') {
          console.log("liste des directions rétournés!");
          this.data3 = [];
          this.data3 = res.data;
          console.log(this.data3)
        } else {
          this.spinner.hide();
          console.log("liste non récuperées");
        }
      },
      (error: any) => console.log(error)
    )
   }
  
   

   //delete
   deleteAnnee(id: any){
    let conf = confirm("Voulez-vous supprimer une annee?");
    if (conf == false) return;
    this.annee.id = id
    this._empService.deleteAnnee(this.annee).subscribe(
      (res: any) => {
        if (res.reponse.code === '200') {
          console.log("Suppression de l'annee reussi !");
          this.toastr.success("Année supprimée")
          this.getAllAnneeList();
          this.data = res.data;
        } else if (res.reponse.code === '500') {
          console.log('Erreur de suppression !');
          this.toastr.error("Erreur serveur, Suppressio échouée");
        }
      },
      (error: any) => {
        console.log(error);
        this.toastr.error("Erreur de suppression");

      }
    )
  };

  deleteDomaine(id: any){
    let conf = confirm("Voulez-vous supprimer un domaine?");
    if (conf == false) return;
    this.domaine.id = id
    this._empServiceD.deleteDomaine(this.domaine).subscribe(
      (res: any) => {
        if (res.reponse.code === '200') {
          console.log("Suppression du doamine reussi !");
          this.toastr.success("Domaine supprimé")
          this.getAllDomaineList();
        } else if (res.reponse.code === '500') {
          console.log('Erreur de suppression !');
          this.toastr.error(" Erreur serveur, suppression échouée");
        }
      },
      (error: any) => {
        console.log(error)
        this.toastr.error("Erreur de suppression");
      }
    )
  };

  deleteCritere(id: any){
    let conf = confirm("Voulez-vous supprimer un critère?");
    if (conf == false) return;
    this.critere.id = id
    this._empServiceC.deleteCritere(this.critere).subscribe(
      (res: any) => {
        if (res.reponse.code === '200') {
          console.log("Suppression du critère reussi !");
          this.toastr.success('Critère supprimé');
          this.getAllCritereList();
          this.data = res.data;
        } else if (res.reponse.code === '500') {
          console.log('Erreur de suppression !');
          this.toastr.error("Erreur Serveur , suppression échouée");
        }
      },
      (error: any) => {
        console.log(error);
        this.toastr.error("Suppression échouée")
      } 
    )
  };
   
  

//MODALEDIT

openModalAnnee(params: number) {
  const initialState = {
    itemSelected:params
  }
  this.modalRef = this.modalService.show(ModaleditAnneeComponent,
    {
      initialState,
    }
    );
}

openModalDomaine(params: any){
  const initialState = {
    itemSelectedd:params
  }
  this.modalRef = this.modalService.show(ModaleditDomaineComponent,
    {
      initialState,
    }
    );
};

openModalCritere(params: any){
  const initialState = {
    itemSelectedc:params
  }
  this.modalRef = this.modalService.show(ModaleditCritereComponent,
    {
      initialState,
    }
    
    );
};


}
