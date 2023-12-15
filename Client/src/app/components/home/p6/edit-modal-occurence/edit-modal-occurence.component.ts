import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { IndicateurService } from 'src/app/core/service/indicateur.service';
import { OccurenceService } from 'src/app/core/service/occurence.service';

@Component({
  selector: 'app-edit-modal-occurence',
  templateUrl: './edit-modal-occurence.component.html',
  styleUrls: ['./edit-modal-occurence.component.css']
})
export class EditModalOccurenceComponent implements OnInit {
   
  @Output() passEntry1 : EventEmitter<any> = new EventEmitter()
  editOccurenceForm = new FormGroup({
    id: new FormControl(''),
    libelle_occurence: new FormControl(''),
    note: new FormControl(''),
   });
   data1:any [] = [];
   itemSelectedO!: any;

   constructor(
    private indicateur: IndicateurService,
    private occurence: OccurenceService,
    private toast: ToastrService
   ){};
  

   ngOnInit(){
    this.getAllIndicateurList();
    this.occurence.getOccurenceById(this.itemSelectedO)
    .subscribe((res) => {
     console.log(res)
       this.editOccurenceForm = new FormGroup({
         id: new FormControl(res.data['id']),
         libelle_occurence: new FormControl(res.data['libelle_occurence']),
         note: new FormControl(res.data['note']),
       })
    })
  };
  
  getAllIndicateurList(){
    this.indicateur.getAllIndicateurList()
    .subscribe(
      (res: any) => {
        console.log(res)
        if (res.reponse.code === '200') {
          console.log("liste des indicateurs rétournés!");
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
  
  updateOccurence(){
    console.log(this.editOccurenceForm.value)
    this.occurence
        .updateOccurence(this.editOccurenceForm.value)
        .pipe(take(1))
        .subscribe((res) => {
          console.log(res)
            if(res.reponse.code === '200') {
                 console.log('Modification enregistrée!');
                 this.passEntry1.emit(true)
                 this.toast.success("Modification validée");
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
