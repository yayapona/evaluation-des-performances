import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DirectionService } from 'src/app/core/service/direction.service';
import { SousDirectionService } from 'src/app/core/service/sous-direction.service';


@Component({
  selector: 'app-edit-modal-sous-direction',
  templateUrl: './edit-modal-sous-direction.component.html',
  styleUrls: ['./edit-modal-sous-direction.component.css']
})
export class EditModalSousDirectionComponent {

  @Output() passEntry3: EventEmitter<any> = new EventEmitter();
  editSousDirectionForm = new FormGroup({
    id: new FormControl(''),
    codedirection: new FormControl(''),
    codesousdirection: new FormControl(''),
    libelecsousdirection: new FormControl(''),
    libelelsousdirection: new FormControl(''),
   });

   data: any[] = [];
   itemSelectes!: any;

   constructor(
    private direction: DirectionService,
    private SousDirection: SousDirectionService,
    private toast: ToastrService,
   ){};

   ngOnInit(){
    this.SousDirection.getSousDirectionById(this.itemSelectes)
    .subscribe((res) => {
     console.log(res)
       this.editSousDirectionForm = new FormGroup({
         id: new FormControl(res.data['id']),
         codedirection: new FormControl(res.data['codedirection']),
         codesousdirection: new FormControl(res.data['codesousdirection']),
         libelecsousdirection: new FormControl(res.data['libelecsousdirection']),
         libelelsousdirection: new FormControl(res.data['libelelsousdirection']),
       })
    })
  };
  
  getAllDirection() {
    this.direction.getAllDirectionList()
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
        (error: any) => {
          console.log(error)
        } 
      )
  };

  updateSousDirection(){
    console.log(this.editSousDirectionForm.value)
    this.SousDirection
        .updateSousDirection(this.editSousDirectionForm.value)
        .pipe(take(1))
        .subscribe((res) => {
          console.log(res)
            if(res.reponse.code === '200') {
                 console.log('Modification enregistrée!');
                 this.passEntry3.emit(true);
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
  };
}
