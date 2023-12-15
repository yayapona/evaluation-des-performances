import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ObjectifService } from 'src/app/core/service/objectif.service';
import { IndicateurService } from 'src/app/core/service/indicateur.service';
import { objectifModel } from 'src/app/model/objectif';
import { contratModel } from 'src/app/model/contrat';
import { critereModel } from 'src/app/model/critere';
import { indicateurModel } from 'src/app/model/indicateur';
import { EditModalObjectifComponent } from './edit-modal-objectif/edit-modal-objectif.component';
import { take } from 'rxjs';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
   
  data: any[] = [];
  data1:any [] = [] ;
  empForm!: FormGroup
  itemSelected!: any
  objectif = new objectifModel();
  critere = new critereModel();
  contrat = new contratModel();
  indicateur = new indicateurModel();
  bsModalRef!: BsModalRef;
  

   constructor(
    private _fb:FormBuilder,
    private _empServiceO: ObjectifService,
    private _empServiceI: IndicateurService,
    private toastr: ToastrService,
    private modalService: BsModalService
   ){
      this.empForm = this._fb.group({
         libelle_objectifs: ['', Validators.required],
         indicateur_id: ['', Validators.required],
         critere_id: ['', Validators.required],
         note_alloue: ['', Validators.required],
      })
   };


    ngOnInit(): void {
      console.log(this.itemSelected);
      this.getAllObjectif();
      this.getAllIndicateur();
       
   
   }
   
   data3 = JSON.parse(localStorage.getItem("contrat")!);


   onSubmitObjectif(){
      this.objectif.libelle_objectifs = this.empForm.get("libelle_objectifs")?.value;
      this.critere.id =this.itemSelected.idCritere
      this.objectif.critere = this.critere ;
      this.objectif.note_alloue = Number(this.empForm.get("note_alloue")?.value) ;
      this.indicateur.id = this.empForm.get("indicateur_id")?.value;
      this.objectif.indicateur = this.indicateur;
      this.contrat.id = this.data3.id;
      this.objectif.contrat = this.contrat
       console.log(this.objectif)
      if (this.objectif.libelle_objectifs.length > 0 ) {
        //Ajout direction
         this._empServiceO
          .AddObjectif(this.objectif)
          .pipe(take(1))
          .subscribe((res) => {
            console.log(res)
                this.getAllObjectif()
              if(res.reponse.code === '202') {
                console.log(res)
                   console.log('objectif enregistrée!');
                   this.toastr.success('Objectif enrégistré')
                   console.log('Success!','Enregistrement effectué avec succès!');
                }else if (res.reponse.code === '500') {
                  console.log("enrégistrement échoué!");
                  this.toastr.error('enrégistrement échoué')
                }
          },
          (error) =>{ console.error('Erreur!','Erreur lors de la saisir des champs requis !');
              console.log("Erreur lors de l'ajout de l'utilisateur !");
              this.toastr.error("Enrégistrement échoué")
              console.log(error);
            }
          );
      }else{
        console.log('Veuillez renseigner les champs requis !');
        console.error('Erreur', 'Veuillez renseigner les champs requis');
      }
    };


    getAllObjectif(){
      this._empServiceO.getAllObjectif()
      .pipe(take(1))
      .subscribe(
        (res: any) => {
          if (res.reponse.code === '200') {
            console.log("liste des objectifs rétournées!");
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
    
    getAllIndicateur(){
      this._empServiceI.getAllIndicateurList()
      .pipe(take(1))
      .subscribe(
        (res:any) => {
          if (res.reponse.code ==='200'){
            console.log("liste des indicateurs rétournés");
            this.data1 = [];
            this.data1 = res.data;
            console.log(this.data1)
          }
        }
      )
    };

    deleteObjectif(id: any){
      let conf = confirm("Voulez-vous supprimer une direction?");
      if (conf == false) return;
      this.objectif.id = id
      this._empServiceO.deleteObjectif(this.objectif).subscribe(
        (res: any) => {
          if (res.reponse.code === '200') {
            console.log("Suppression de la direction reussi !");
            console.log('Direction supprimée avec succès', 'succès');
            this.toastr.success("Suppresion réussi")
            this.getAllObjectif();
          } else if (res.reponse.code === '500') {
            console.log('Erreur de suppression !');
            console.log("Erreur de suppression");
          }
        },
        (error: any) => console.log(error)
      )
    };

    openModalEdit(params: number){
      const initialState = {
        itemSelected: params
      }
      this.bsModalRef = this.modalService.show(EditModalObjectifComponent,
        {
          initialState
        }
        );
    };
}
