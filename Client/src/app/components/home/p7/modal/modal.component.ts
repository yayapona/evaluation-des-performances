import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { take } from 'rxjs';
import { ContratService } from 'src/app/core/service/contrat.service';
import { ObjectifService } from 'src/app/core/service/objectif.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

   itemSelected: any;
   data2: any[] = [];
   data3: any[] = [];
   data5: any;
   showContrat: boolean = false;

   constructor(
    private empService: ObjectifService,
    private _empService: ContratService
   ){}
   
   data4 = JSON.parse(localStorage.getItem("contrat")!);
    
   ngOnInit(){
    this.getContratById();  
 
   };

   getContratById(){
    this._empService.getAllContratListById(this.itemSelected)
    .pipe(take(1))
    .subscribe(
      (res: any) => {
        if (res.reponse.code === '200') {
          console.log("liste des contrats rétournés!");
          this.data2 = [];
          this.data2 = res.data;
          console.log(this.data2);  
          this.data3 = this.data2.filter( item => item.statut_contrat == 'soumis');
          this.data5 = this.data3[0].id;
          console.log(this.data3);
          console.log(this.data5);
          this.showContrat = true   
           } else {
          console.log("liste non récuperées");
        }
      },
      (error: any) => console.log(error)
    )
   };
}
