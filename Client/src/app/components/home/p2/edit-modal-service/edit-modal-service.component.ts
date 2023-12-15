import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/core/service/service.service';
import { SousDirectionService } from 'src/app/core/service/sous-direction.service';

@Component({
  selector: 'app-edit-modal-service',
  templateUrl: './edit-modal-service.component.html',
  styleUrls: ['./edit-modal-service.component.css']
})
export class EditModalServiceComponent {
  
  @Output () passEntry2: EventEmitter<any> = new EventEmitter()
  editServiceForm = new FormGroup({
    id: new FormControl(''),
    codesousdirection: new FormControl(''),
    codeservice: new FormControl(''),
    libelecservice: new FormControl(''),
    libelelservice: new FormControl(''),
   });


   data: any[] = [];
   itemSelectess!: any;

   constructor(
    private service: ServiceService,
    private SousDirection: SousDirectionService,
    private toast: ToastrService,
   ){};

   ngOnInit(){
    this.service.getServiceByIdt(this.itemSelectess)
    .subscribe((res) => {
     console.log(res)
       this.editServiceForm = new FormGroup({
         id: new FormControl(res.data['id']),
         codesousdirection: new FormControl(res.data['codedirection']),
         codeservice: new FormControl(res.data['codeservice']),
         libelecservice: new FormControl(res.data['libelecservice']),
         libelelservice: new FormControl(res.data['libelelservice']),
       })
    })
  };
  
  getAllSousDirection() {
    this.SousDirection.getAllSousDirectionList()
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
    console.log(this.editServiceForm.value)
    this.service
        .updateService(this.editServiceForm.value)
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
