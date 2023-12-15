import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DirectionService } from 'src/app/core/service/direction.service';
import { ToastrService } from 'ngx-toastr';
import { SousDirectionService } from 'src/app/core/service/sous-direction.service';
import { ServiceService } from 'src/app/core/service/service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { directionModel } from 'src/app/model/directionModel';
import { sousDirectionModel } from 'src/app/model/Sous-directionModel';
import { serviceModel } from 'src/app/model/serviceModel';
import { ModalFonctionComponent } from './modal-fonction/modal-fonction.component';
import { EditModalDirectionComponent } from './edit-modal-direction/edit-modal-direction.component';
import { EditModalSousDirectionComponent } from './edit-modal-sous-direction/edit-modal-sous-direction.component';
import { EditModalServiceComponent } from './edit-modal-service/edit-modal-service.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-p2',
  templateUrl: './p2.component.html',
  styleUrls: ['./p2.component.css']
})
export class P2Component implements OnInit {
   
  data: any = [];
  data1: any = [];
  data2: any = [];
  activeTab:string = 'Personal Details';

  modalRef?: BsModalRef;
  empForm!: FormGroup;
  empFormD!: FormGroup;
  empFormS! : FormGroup;

  direction = new directionModel();
  sousDirection = new sousDirectionModel();
  service = new serviceModel();


  constructor(
    private _fb: FormBuilder,
    private _empService: DirectionService,
    private _empSousDirectionService: SousDirectionService,
    private _empServiceS: ServiceService,
    private modalService: BsModalService,
    private toast: ToastrService,
    private spinner : NgxSpinnerService

  ){
    this.empForm =  this._fb.group({
      codedirection: ['',Validators.required],
      libelecdirection: ['',Validators.required],
      libeleldirection: ['', Validators.required]

    });
    this.empFormD =  this._fb.group({
      codedirection: ['',Validators.required],
      codesousdirection: ['', Validators.required],
      libelecsousdirection: ['', Validators.required],
      libelelsousdirection: ['', Validators.required]
    });
    this.empFormS = this._fb.group({
      codesousdirection: ['', Validators.required],
      codeservice: ['',Validators.required],
      libelecservice: ['', Validators.required],
      libelelservice: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.getAllDirection();
    this.getAllSousDirection();
    this.getAllService()
  }

   //OPENMODAL
    
   openModalFonction(){
      this.modalRef = this.modalService.show(ModalFonctionComponent,
        {
          class: 'modal-lg'
        }
        )
   };
  
   openModalDirection(id: number){
    const initialState = {
      itemSelected: id
    }
      this.modalRef = this.modalService.show(EditModalDirectionComponent,
        { 
          initialState,
   
        });
        this.modalRef.content.passEntry1.subscribe((res: any) =>{
          if(res){
               this.getAllDirection()
          }
        })
   };
  
   openModalSousDirection(id:number){
    const initialState = {
      itemSelectes: id
    }
      this.modalRef = this.modalService.show(EditModalSousDirectionComponent,
        {
          initialState,
         
        });
        this.modalRef.content.passEntry2.subscribe((res : any)=>{
          if(res){
             this.getAllSousDirection();
          }
        })
   };
  
   openModalService(id : number){
    const initialState = {
      itemSelectess: id
    }
      this.modalRef = this.modalService.show(EditModalServiceComponent,
        {  
          initialState,
        })
      this.modalRef.content.passEntry3.subscribe((res: any) => {
        if(res){
        this.getAllService()
        }
      })
   };
  
  
  onTabClick(tab: string){
      this.activeTab = tab;
  }

    //SUBMIT
   onDirectionSubmit(){
      this.direction.code = this.empForm.get("codedirection")?.value;
      this.direction.libelle_court = this.empForm.get("libelecdirection")?.value;
      this.direction.libelle_long = this.empForm.get("libeleldirection")?.value;
      console.log(this.direction);
    
    if (this.direction) {
       this.spinner.show();
      //Ajout direction
       this._empService
        .AddDirection(this.direction)
        .pipe(take(1))
        .subscribe((res) => {
          console.log(res)
          this.getAllDirection();
            if(res.reponse.code === '200') {
                 this.spinner.hide()
                 console.log('Direction enregistrée!');
                 this.toast.success("Direction enregistrée avec succès")
                 this.resetForm()
              }else if (res.reponse.code === '500') {
                console.log("enrégistrement échoué!");
                this.toast.error(" Erreur serveur, enregistrement échoué")
              }
        },
        (error) =>{ console.log('Erreur!','Erreur lors de la saisir des champs requis !');
            console.log("Erreur lors de l'ajout de l'utilisateur !");
            console.log(error);
            this.toast.error("enregistrement échoué");
          }
        );
    }else{
      console.log('Veuillez renseigner les champs requis !');
      console.log('Erreur', 'Veuillez renseigner les champs requis');
    }
  };

  onSousDirectionSubmit(){
    this.direction.id = Number(this.empFormD.get('codedirection')?.value)
    this.sousDirection.direction = this.direction ;
    this.sousDirection.code_sous_direction = this.empFormD.get("codesousdirection")?.value;
    this.sousDirection.libelle_court = this.empFormD.get("libelecsousdirection")?.value;
    this.sousDirection.libelle_long = this.empFormD.get("libelelsousdirection")?.value;
    console.log(this.sousDirection);
  if (this.sousDirection) {
    //Ajout direction
    this.spinner.show();
     this._empSousDirectionService
      .AddSousDirection(this.sousDirection)
      .pipe(take(1))
      .subscribe((res) => {
          console.log(res)
          this.getAllSousDirection()
          if(res.reponse.code === '202') {
               this.spinner.hide()
               console.log('Sous-direction enregistrée!');
               this.toast.success('Sous-direction enregistrée avec succès')
               this.resetFormSD()
            }else if (res.reponse.code === '500') {
               console.log("enregistrement échoué!");
               this.toast.error(" Erreur serveur, enregistrement échoué");
            }
      },
      (error) =>{ console.log('Erreur!','Erreur lors de la saisir des champs requis !');
          console.log("Erreur lors de l'ajout de l'utilisateur !");
          console.log(error);
          this.toast.error("Enregistrement échoué");        
        }
      );
  }else{
    console.log('Veuillez renseigner les champs requis !');
    console.log('Erreur', 'Veuillez renseigner les champs requis');
  }
};


onServiceSubmit(){
  this.sousDirection.id = Number(this.empFormS.get("codesousdirection")?.value)
  this.service.sous_direction = this.sousDirection ;
  this.service.code_service = this.empFormS.get("codeservice")?.value;
  this.service.libelle_court = this.empFormS.get("libelecservice")?.value;
  this.service.libelle_long = this.empFormS.get("libelelservice")?.value;
  console.log(this.service);
if (this.service) {
  //Ajout direction
  this.spinner.show();
   this._empServiceS
    .AddService(this.service)
    .pipe(take(1))
    .subscribe((res) => {
        this.getAllService();
        if(res.reponse.code === '202') {
             this.spinner.hide();
             console.log('Service enregistrée avec succès!');
             this.toast.success("Service enregistré")
             this.resetFormS()
          }else if (res.reponse.code === '500') {
             console.log("enregistrement échoué!");
             this.toast.error("Erreur serveur, enregistrement échoué");
          }
    },
    (error) =>{ console.log('Erreur!','Erreur lors de la saisir des champs requis !');
        console.log("Erreur lors de l'ajout de l'utilisateur !");
        console.log(error);
        this.toast.error("Enregistrement échoué");
      }
    );
}else{
  console.log('Veuillez renseigner les champs requis !');
  console.log('Erreur', 'Veuillez renseigner les champs requis');
}
};

    //GET

    getAllDirection() {
      this.spinner.show();
      this._empService.getAllDirectionList()
        .pipe(take(1))
        .subscribe(
          (res: any) => {
            if (res.reponse.code === '200') {
              console.log("liste des directions rétournées!");
              this.data = [];
              this.data = res.data;
              this.spinner.hide();
              console.log(this.data)
            } else {
              console.log("liste non récuperées");
            }
          },
          (error: any) => {
            console.log(error)
          } 
        )
    };
  
  
    getAllSousDirection() {
      this.spinner.show();
      this._empSousDirectionService.getAllSousDirectionList()
        .pipe(take(1))
        .subscribe(
          (res: any) => {
            if (res.reponse.code === '200') {
              console.log("liste des sous-directions rétournées!");
              this.data1 = [];
              this.data1 = res.data;
              this.spinner.hide();
              console.log(this.data1)
            } else {
              console.log("liste non récuperées");
            }
          },
          (error: any) => {
            console.log(error);
          }
        )
    };
  
  
    getAllService() {
      this.spinner.show();
      this._empServiceS.getAllServiceList()
        .pipe(take(1))
        .subscribe(
          (res: any) => {
            if (res.reponse.code === '200') {
              console.log("liste des servcies rétournés!");
              this.data2 = [];
              this.data2 = res.data;
              this.spinner.hide();
              console.log(this.data2);
            } else {
              console.log("liste non récuperés");
            }
          },
          (error: any) => console.log(error)
        )
    };   

  
    //DELETE
  
    deleteDirection(id: any){
      let conf = confirm("Voulez-vous supprimer une direction?");
      if (conf == false) return;
      this.direction.id = id
      this._empService.deleteDirection(this.direction).subscribe(
        (res: any) => {
          if (res.reponse.code === '200') {
            this.toast.success("Direction supprimée")
            console.log('Direction supprimée avec succès');
            this.getAllDirection();
          } else if (res.reponse.code === '500') {
            console.log('Erreur de suppression !');
            this.toast.error("Erreur serveur, Suppression échouée");
          }
        },
        (error: any) =>{
          console.log(error);
          this.toast.error("Suppression échouée")
        }
      )
    };
  
  
    deleteSousDirection(id: any){
      let conf = confirm("Voulez-vous supprimer une sous-direction?");
      if (conf == false) return;
      this.sousDirection.id = id
      this._empSousDirectionService.deleteSousDirection(this.sousDirection).subscribe(
        (res: any) => {
          if (res.reponse.code === '200') {
            console.log("Suppression de la sous-direction reussi !");
            this.toast.success("Sous-direction supprimée")
            this.getAllSousDirection();
          } else if (res.reponse.code === '500') {
            console.log('Erreur de suppression !');
            this.toast.error("Erreur serveur , suppression échouée")
            ;
          }
        },
        (error: any) => {
          console.log(error)
          this.toast.error("Suppression échouée")
        }
      )
    };
    
    deleteService(id: any){
      let conf = confirm("Voulez-vous supprimer un service?");
      if (conf == false) return;
      this.service.id = id
      this._empServiceS.deleteService(this.service).subscribe(
        (res: any) => {
          if (res.reponse.code === '200') {
            console.log("Suppression du service reussi!");
            this.toast.success("Service supprimé")
            this.getAllService();
          } else if (res.reponse.code === '500') {
            console.log('Erreur de suppression !');
            this.toast.error("Erreur serveur, suppression échoué");
          }
        },
        (error: any) => {
          console.log(error);
          this.toast.error("Suppression échouée")
        } 
      )
    };
  
  // RESET  
  
  resetForm(){
    this.empForm.reset()
  };
  resetFormSD(){
    this.empFormD.reset()
  };
  resetFormS(){
    this.empFormS.reset()
  }
}
