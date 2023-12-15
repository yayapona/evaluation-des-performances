import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { take } from 'rxjs';
import { DomaineService } from 'src/app/core/service/domaine.service';
import { AnneeService } from 'src/app/core/service/annee.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DirectionService } from 'src/app/core/service/direction.service';
import { anneeModel } from 'src/app/model/annee';
import { directionModel } from 'src/app/model/directionModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modaledit-domaine',
  templateUrl: './modaledit-domaine.component.html',
  styleUrls: ['./modaledit-domaine.component.css']
})
export class ModaleditDomaineComponent {
  
  @Output() passEntry2: EventEmitter<any> = new EventEmitter()
  editDomaineForm = new FormGroup({
    id: new FormControl(''),
    libelle_domaine: new FormControl('')
   });


   data: any[] = []
   data1: any[] = []
   itemSelectedd!: any;
   directionModel = new directionModel();
   anneeM = new anneeModel();

   constructor(
    private annee: AnneeService,
    private direction: DirectionService,
    private domaine: DomaineService,
    private toast: ToastrService,
    private spinner : NgxSpinnerService,
   ){};


   ngOnInit(){
    this.getAllAnneeList();
    this.getAllDirection()
    this.domaine.getDomaineById(this.itemSelectedd)
    .subscribe((res) => {
     console.log(res)
       this.editDomaineForm = new FormGroup({
         id: new FormControl(res.data['id']),
         libelle_domaine: new FormControl(res.data.libelle_domaine)
       })
    })
  };


  getAllAnneeList(){
    this.annee.getAllAnneeList()
    .pipe(take(1))
    .subscribe(
      (res: any) => {
        if (res.reponse.code === '200') {
          console.log("liste des années rétournées!");
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


  getAllDirection(){
    this.direction.getAllDirectionList()
    .pipe(take(1))
    .subscribe(
      (res: any) => {
        if (res.reponse.code === '200') {
          console.log("liste des Directions rétournées!");
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


  updateDomaine(){
    this.spinner.show()
    console.log(this.editDomaineForm.value)
    this.domaine
        .updateDomaine(this.editDomaineForm.value)
        .pipe(take(1))
        .subscribe((res) => {
          console.log(res)
            if(res.reponse.code === '200') {
                 console.log('Modification enregistrée!');
                 this.passEntry2.emit(true);
                 this.spinner.hide()
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
