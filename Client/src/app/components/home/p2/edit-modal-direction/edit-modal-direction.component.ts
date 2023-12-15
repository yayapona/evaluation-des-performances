import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DirectionService } from 'src/app/core/service/direction.service';


@Component({
  selector: 'app-edit-modal-direction',
  templateUrl: './edit-modal-direction.component.html',
  styleUrls: ['./edit-modal-direction.component.css']
})
export class EditModalDirectionComponent {

  @Output() passEntry1 : EventEmitter<any> = new EventEmitter() ; 
  editDirectionForm = new FormGroup({
    id: new FormControl(''),
    codedirection: new FormControl(''),
    libelecdirection: new FormControl(''),
    libeleldirection: new FormControl(''),
   });

   data: any[] = [];
   itemSelected!: any


   constructor(
    private direction: DirectionService,
    private toast: ToastrService,
   ){};

   ngOnInit(){
    this.direction.getDirectionById(this.itemSelected)
    .subscribe((res) => {
     console.log(res)
       this.editDirectionForm = new FormGroup({
         id: new FormControl(res.data['id']),
         codedirection: new FormControl(res.data['code']),
         libelecdirection: new FormControl(res.data['libele_court']),
         libeleldirection: new FormControl(res.data['libele_long'])
       })
    })
  };

  updateDirection(){
    console.log(this.editDirectionForm.value)
    this.direction
        .updateDirection(this.editDirectionForm.value)
        .pipe(take(1))
        .subscribe((res) => {
          console.log(res)
            if(res.reponse.code === '200') {
                 console.log('Modification enregistrée!');
                 this.passEntry1.emit(true);
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
