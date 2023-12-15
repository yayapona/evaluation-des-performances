import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-view-contrat',
  templateUrl: './modal-view-contrat.component.html',
  styleUrls: ['./modal-view-contrat.component.css']
})
export class ModalViewContratComponent implements OnInit {
     itemSelected: any;
     showContrat: boolean = false

     ngOnInit(): void {
         console.log(this.itemSelected)
     }

   
}
