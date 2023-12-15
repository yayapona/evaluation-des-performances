import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalFonctionComponent } from '../modal-fonction/modal-fonction.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FonctionService } from '../../../../core/service/fonction.service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';




@Component({
  selector: 'app-modaledit',
  templateUrl: './modaledit.component.html',
  styleUrls: ['./modaledit.component.css']
})
export class ModaleditComponent implements OnInit {
   
  editFonctionForm = new FormGroup ({
    datefin : new FormControl(''),
    status : new FormControl('')
  });

  modalRef?: BsModalRef;
  constructor(
    private modalservice: BsModalService,
    private _empService: FonctionService,
    private toast: ToastrService,
  ){}

  ngOnInit(){

  };

  getChiefById(){
    this._empService.getChiefById(
      //id de la foncton
    ).subscribe(
      (res: any) => {
        console.log(res)
        this.editFonctionForm = new FormGroup({
          datefin: new FormControl(res['datefin']),
          status: new FormControl(res['status']),
        });
      },
      (err: any) => console.log(err)
    );
  };

  updateFonction(){
    console.log(this.editFonctionForm)
    this._empService
        .updateChief (this.editFonctionForm.value)
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
  };
  
}
