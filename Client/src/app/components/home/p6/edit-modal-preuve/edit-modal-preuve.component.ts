import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { IndicateurService } from 'src/app/core/service/indicateur.service';
import { PreuveService } from 'src/app/core/service/preuve.service';

@Component({
  selector: 'app-edit-modal-preuve',
  templateUrl: './edit-modal-preuve.component.html',
  styleUrls: ['./edit-modal-preuve.component.css']
})
export class EditModalPreuveComponent implements OnInit {
  
  @Output() passEntry3 : EventEmitter<any> = new EventEmitter()
  editPreuveForm = new FormGroup({
    id: new FormControl(''),
    libelle_preuve: new FormControl(''),
   });


   data1:any [] = [];
   itemSelected!: any;
  

   constructor(
    private indicateur: IndicateurService,
    private preuve: PreuveService,
    private toast: ToastrService
   ){};

   ngOnInit(){
    this.preuve.getPreuveById(this.itemSelected)
    .subscribe((res) => {
     console.log(res)
       this.editPreuveForm = new FormGroup({
         id: new FormControl(res.data['id']),
         libelle_preuve: new FormControl(res.data['libelle_preuve']),
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


   updatePreuve(){
    console.log(this.editPreuveForm.value)
    this.preuve
        .updatePreuve(this.editPreuveForm.value)
        .pipe(take(1))
        .subscribe((res) => {
          console.log(res)
            if(res.reponse.code === '200') {
                 console.log('Modification enregistrée!');
                 this.passEntry3.emit(true);
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
