import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { IndicateurService } from 'src/app/core/service/indicateur.service';

@Component({
  selector: 'app-edit-modal-indicateur',
  templateUrl: './edit-modal-indicateur.component.html',
  styleUrls: ['./edit-modal-indicateur.component.css']
})
export class EditModalIndicateurComponent implements OnInit {
  
  @Output() passEntry2 : EventEmitter<any> = new EventEmitter()
  editIndicateurForm = new FormGroup({
    id: new FormControl(''),
    libelle_indicateur: new FormControl(''),
   });

   itemSelected!: any;

   constructor(
    private indicateur: IndicateurService,
    private toast: ToastrService
   ){};

   ngOnInit(){

    this.indicateur.getIndicateurById(this.itemSelected)
    .subscribe((res) => {
     console.log(res)
       this.editIndicateurForm = new FormGroup({
         id: new FormControl(res.data['id']),
         libelle_indicateur: new FormControl(res.data['libelle_indicateur']),
       })
    })
  }; 


  updateIndicateur(){
    console.log(this.editIndicateurForm.value)
    this.indicateur
        .updateIndicateur(this.editIndicateurForm.value)
        .pipe(take(1))
        .subscribe((res) => {
          console.log(res)
            if(res.reponse.code === '200') {
                 console.log('Modification enregistrée!');
                 this.passEntry2.emit(true);
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
