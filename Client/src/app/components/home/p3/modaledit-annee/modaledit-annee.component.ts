import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs';
import { AnneeService } from 'src/app/core/service/annee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modaledit-annee',
  templateUrl: './modaledit-annee.component.html',
  styleUrls: ['./modaledit-annee.component.css']
})
export class ModaleditAnneeComponent implements OnInit {
   
   @Output() passEntry1: EventEmitter<any> = new EventEmitter();
   editAnneeForm = new FormGroup({
    id: new FormControl(''),
    annee: new FormControl(''),
    theme: new FormControl(''),
    statut: new FormControl(''),
  
   });
   data: any[] = []
   itemSelected!: any
   constructor(
    private annee: AnneeService,
    private toast: ToastrService,
    private spinner : NgxSpinnerService,

   ){
    console.log(this.itemSelected)
   }

   ngOnInit(){
     this.annee.getAnneeById(this.itemSelected)
     .subscribe((res) => {
      console.log(res)
        this.editAnneeForm = new FormGroup({
          id: new FormControl(res.data['id']),
          annee: new FormControl(res.data['annee']),
          theme: new FormControl(res.data['theme']),
          statut: new FormControl(res.data['statut']),
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

   updateAnne(){
    this.spinner.show();
    console.log(this.editAnneeForm.value)
    this.annee
        .updateAnnee(this.editAnneeForm.value)
        .pipe(take(1))
        .subscribe((res) => {
          console.log(res)
            if(res.reponse.code === '200') {
                 console.log('Modification enregistrée!');
                 this.passEntry1.emit(true);
                 this.spinner.hide();
                 this.toast.success("Modification validé");
              
              }else if (res.reponse.code === '500') {
                console.log("Erreur serveur, modification échouée!");
                this.spinner.hide();
                this.toast.error("Erreur serveur, Modification  échouée");
              }
        },
        (error) =>{ console.log('Erreur!','Erreur lors de la saisir des champs requis !');
            console.log("Erreur lors de l'ajout de l'utilisateur !");
            this.spinner.hide();
            this.toast.error("Modification échouée");
            console.log(error);
          }
        );
   };
}
