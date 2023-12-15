import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CritereService } from 'src/app/core/service/critere.service';
import { DomaineService } from 'src/app/core/service/domaine.service';

@Component({
  selector: 'app-modaledit-critere',
  templateUrl: './modaledit-critere.component.html',
  styleUrls: ['./modaledit-critere.component.css']
})
export class ModaleditCritereComponent implements OnInit {
  
  @Output() passEntry3: EventEmitter<any> = new EventEmitter();
  editCritereForm = new FormGroup({
    id: new FormControl(''),
    libelle_critere: new FormControl('')
   });

  data: any[] = [];
  data1: any[] = [];
  itemSelectedc!: any;
  
   constructor(
    private domaine: DomaineService,
    private critere: CritereService,
    private toast: ToastrService, 
    private spinner : NgxSpinnerService,
   ){};


   ngOnInit(){
    this.getAllDomaineList();
    this.critere.getCritereId(this.itemSelectedc)
    .subscribe((res) => {
     console.log(res)
       this.editCritereForm = new FormGroup({
         id: new FormControl(res.data['id']),
         libelle_critere: new FormControl(res.data['libelle_critere'])
       })
    })
  };
  
  getAllDomaineList(){
    this.domaine.getAllDomaineList()
    .pipe(take(1))
    .subscribe(
      (res: any) => {
        if (res.reponse.code === '200') {
          console.log("liste des domaines rétournés!");
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


  updateCritere(){
    this.spinner.show()
    console.log(this.editCritereForm.value)
    this.critere
        .updateCritere(this.editCritereForm.value)
        .pipe(take(1))
        .subscribe((res) => {
          console.log(res)
            if(res.reponse.code === '200') {
                 console.log('Modification enregistrée!');
                 this.passEntry3.emit(true);
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
