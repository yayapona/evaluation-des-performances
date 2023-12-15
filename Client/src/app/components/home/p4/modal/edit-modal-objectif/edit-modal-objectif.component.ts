import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { take } from 'rxjs';
import { ObjectifService } from 'src/app/core/service/objectif.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-modal-objectif',
  templateUrl: './edit-modal-objectif.component.html',
  styleUrls: ['./edit-modal-objectif.component.css']
})
export class EditModalObjectifComponent  implements OnInit  {
   
  
  editObjectifForm = new FormGroup({
    id: new FormControl(''),
    libelle_objectifs: new FormControl(''),
    note_alloue: new FormControl(''),
   });

   itemSelected: any;
  constructor(
    private objectif: ObjectifService,
    private toast: ToastrService,
  ){};

  ngOnInit(){
    this.objectif.getObjectifById(this.itemSelected)
    .subscribe((res) => {
      console.log(res)
        this.editObjectifForm = new FormGroup({
          id: new FormControl(res.data['id']),
          libelle_objectifs: new FormControl(res.data['libelle_objectifs']),
          note_alloue: new FormControl(res.data['note_alloue']),
        })
     });
  }

  
  updateObjectif(){
    console.log(this.editObjectifForm.value)
    this.objectif
        .updateObjectif(this.editObjectifForm.value)
        .pipe(take(1))
        .subscribe((res) => {
          console.log(res)
            if(res.reponse.code === '200') {
                 console.log('Modification enregistrée!');
                 this.toast.success("Modification validé");
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
  }
 
 
}
