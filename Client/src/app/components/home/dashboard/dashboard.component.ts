import { Component, OnInit } from '@angular/core';
import { DirectionService } from 'src/app/core/service/direction.service';
import { SousDirectionService } from 'src/app/core/service/sous-direction.service';
import { ServiceService } from 'src/app/core/service/service.service';
import { ContratService } from 'src/app/core/service/contrat.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { contratModel } from 'src/app/model/contrat';
import { take } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    data1: any;
    data2: any;
    data3: any;
    data4: any;
    data5: any;
    contratModel = new contratModel();

    popoverTitle = 'Suppression';
    popoverMessage = 'Voulez-vous supprimer ce contrat';
    confirmClicked = false;
    cancelClicked = false;
    
    constructor(
      private direction: DirectionService,
      private sousdirection: SousDirectionService,
      private service: ServiceService,
      private contrat: ContratService,
      private toast: ToastrService, 
      private spinner : NgxSpinnerService
    ){};

    ngOnInit(){
       this.getDirectionNombre();
       this.getSousDirectionNombre();
       this.getServiceNombre();
       this.getContratNombre();
       this.getAllContrat();
    };


    getDirectionNombre() {
      this.spinner.show();
      this.direction.getNombreDirection()
        .pipe(take(1))
        .subscribe(
          (res: any) => {
              this.data1 = res.reponse;
              this.spinner.hide(); 
              console.log(this.data1)
          },
          (error: any) => console.log(error)
        );
    };

    getSousDirectionNombre() {
      this.spinner.show() ; 
      this.sousdirection.getSousDirectionNombre()
        .pipe(take(1))
        .subscribe(
          (res: any) => {
              this.data2 = res.reponse;
              this.spinner.hide() ; 
              console.log(this.data2)
          },
          (error: any) => console.log(error)
        );
    };

    getServiceNombre() {
      this.spinner.show() ; 
      this.service.getServiceNombre()
        .pipe(take(1))
        .subscribe(
          (res: any) => {
              this.data3 = res.reponse;
              this.spinner.hide() ; 
              console.log(this.data3)
          },
          (error: any) => console.log(error)
        );
    };

    getContratNombre() {
      this.spinner.show() ; 
      this.contrat.getContratNombre()
        .pipe(take(1))
        .subscribe(
          (res: any) => {
              this.data4 = res.reponse;
              this.spinner.hide() ; 
              console.log(this.data4)
          },
          (error: any) => console.log(error)
        );
    };

    getAllContrat() {
      this.spinner.show() ; 
      this.contrat.getAllContratList()
        .pipe(take(1))
        .subscribe(
          (res: any) => {
            if (res.reponse.code === '200') {
              console.log("Liste des Contrats rétournés!");
              this.data5 = [];
              this.data5 = res.data;
              this.spinner.hide() ; 
              console.log(this.data5)
            } else {
              this.spinner.hide() ; 
              console.log("Liste non récuperés");
            }
          },
          (error: any) => console.log(error)
        );
    };


    deleteContrat(id: any){
     this.spinner.show()
     this.contratModel.id = id
      this.contrat.deleteContrat(this.contratModel)
      .subscribe(
        (res: any) => {
          if (res.reponse.code === '200') {
            this.toast.success("Contrat supprimé")
            console.log('Contrat supprimé avec succès');
            this.getAllContrat();
            this.getContratNombre();
          } else if (res.reponse.code === '500') {
            console.log('Erreur de suppression !');
            this.toast.error("Erreur serveur, Suppression échouée");
          }
        },
        (error: any) =>{
          console.log(error);
          this.spinner.hide();
          this.toast.error("Suppression échouée")
        }
      )
    };
  
}
