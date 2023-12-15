import { Component, EventEmitter, OnInit,Output } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { agentModel } from 'src/app/model/agent';
import { DirectionService } from 'src/app/core/service/direction.service';
import { SousDirectionService } from 'src/app/core/service/sous-direction.service';
import { ServiceService } from 'src/app/core/service/service.service';
import { directionModel } from 'src/app/model/directionModel';
import { sousDirectionModel } from 'src/app/model/Sous-directionModel';
import { serviceModel } from 'src/app/model/serviceModel';
import { AgentService } from 'src/app/core/service/agent.service';
import { take } from 'rxjs';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  selectedOption!: number 
  modalRef!: BsModalRef;
  data: any = [];
  data1: any = [
    {
      id:1,
      libele_long: 'direction'
    },
    {
      id:2,
      libele_long: 'direction1'
    },
    {
      id:3,
      libele_long: 'direction2'
    },
  ];
  data2: any = [];
  data3: any = [];
  listSDC: any [] = [];
  listSDS: any [] = [];

  
  empForm!: FormGroup;
  user = new agentModel();
  direction = new directionModel();
  sousDirection = new sousDirectionModel();
  service = new serviceModel();

  constructor(
    private modalService: BsModalService,
    private _fb: FormBuilder,
    private _empService: AgentService,
    private _empServiceD: DirectionService,
    private _empSousDirectionService: SousDirectionService,
    private _empServiceS: ServiceService,
    private toastr: ToastrService,
    private spinner : NgxSpinnerService,


    ) {
      this.empForm =  this._fb.group({
        nom: ['',Validators.required],
        prenom: ['',Validators.required],
        email: ['',Validators.required],
        matricule: ['',Validators.required],
        fonction: ['',Validators.required],
        direction_id: ['', Validators.required],
        sousdirection_id:['', Validators.required],
        service_id: ['', Validators.required],
        rang : ['', Validators.required]
      })
    }
    
    ngOnInit() {
      this.getAllDirection();
      this.getAllSousDirection()
      this.getAllService()
    }

    onFormSubmit(){

      this.user.nom = this.empForm.get("nom")?.value;
      this.user.prenom = this.empForm.get("prenom")?.value;
      this.user.email = this.empForm.get("email")?.value;
      this.user.matricule = this.empForm.get("matricule")?.value;
      this.user.fonction = this.empForm.get("fonction")?.value;
      this.direction.id = Number(this.empForm.get("direction_id")?.value)
      this.user.direction = this.direction; 
      this.sousDirection.id = Number(this.empForm.get("sousdirection_id")?.value);
      this.user.sous_direction = this.sousDirection;
      this.service.id = Number(this.empForm.get("service_id")?.value);
      this.user.servic = this.service;
      console.log(this.user);
      if (this.user) {
          this.spinner.show();
        //Ajout User;
        this._empService
          .AddAgent(this.user)
          .pipe(take(1))
          .subscribe(
            (res) => {
              console.log(res)
             if (res.reponse.code === '202') {
                this.spinner.hide();
                console.log('Agent enregistré!');
                this.toastr.success("Agent enregistré avec succès");
                this.passEntry.emit(true)
                this.resetForm()
              }else if (res.reponse.code === '409') {
                this.spinner.hide();
                this.toastr.error("L'agent existe déja")
              }
              else if (res.reponse.code === '500') {
                this.spinner.hide();
                console.log("l'agent n'a pas pu etre enregistrer!");
              }
            },
            (error) => { console.log('Erreur!','Erreur lors de la saisir des champs requis !');
              console.log("Erreur lors de l'ajout de l'utilisateur !");
              this.toastr.error("Agent non enregistrer")
              console.log(error);
            }
          );
      } else {
        console.log('Veuillez renseigner les champs requis !');
      }
    };
    
    getAllDirection() {
      this._empServiceD.getAllDirectionList()
        .pipe(take(1))
        .subscribe(
          (res: any) => {
            if (res.reponse.code === '200') {
              console.log("liste des directions rétournées!");
              this.data = [];
              this.data = res.data;
              console.log(this.data)
            } else {
              console.log("liste non récuperées");
            }
          },
          (error: any) => console.log(error)
        )
    };

    getAllSousDirection() {
      this._empSousDirectionService.getAllSousDirectionList()
        .pipe(take(1))
        .subscribe(
          (res: any) => {
            if (res.reponse.code === '200') {
              console.log("liste des sous-directions rétournées!");
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

    getAllSousDirectionById(id: number) {
      this._empSousDirectionService.getSousDirectionById(id)
        .pipe(take(1))
        .subscribe(
          (res: any) => {
            if (res.reponse.code === '200') {
              console.log("liste des sous-directions rétournées!");
              this.data3 = [];
              this.data3 = res.data;
              console.log(this.data3)
            } else {
              console.log("liste non récuperées");
            }
          },
          (error: any) => console.log(error)
        )
    };

    getAllService() {
      this._empServiceS.getAllServiceList()
        .pipe(take(1))
        .subscribe(
          (res: any) => {
            if (res.reponse.code === '200') {
              console.log("liste des servcies rétournés!");
              this.data2 = [];
              this.data2 = res.data;
              console.log(this.data2)
            } else {
              console.log("liste non récuperés");
            }
          },
          (error: any) => console.log(error)
        )
    }; 

    
    onChange(event: any): any{
      console.log(event);
      if(event !== null){
        this.listSDC = this.data1.filter( (item: { id: any;  direction:{ id:any} }) => item.direction.id === event.id )
      }
      console.log(this.listSDC)
    };


    onChangeS(event: any): any{
      console.log(event);
      if(event !== null){
        this.listSDS = this.data2.filter( (item: { id: any;  sous_direction:{ id:any} }) => item.sous_direction.id === event.id )
      }
      console.log(this.listSDS)
    };
    


    onChangeFonction(event: any) {
      console.log(event.target.value)
      if(event !== null){
        switch (event.target.value){
          case 'agent': 
            this.selectedOption = 1;
            break
          case 'chef de service':
            this.selectedOption = 2;
            break
          case 'sous-directeur':
            this.selectedOption = 3;
            break
          case 'directeur':
            this.selectedOption = 4;
            break
        }
      };
    };
    
    resetForm() {
      this.empForm.reset();
    };

    closeModal() {
      this.modalRef.hide();
    }
}
