import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ContratService } from 'src/app/core/service/contrat.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxPermissionsService } from 'ngx-permissions';
import { agentModel } from 'src/app/model/agent';
import { contratModel } from 'src/app/model/contrat';
import { take } from 'rxjs';


interface IidNote {
  id: number;
  note_obtenue: number,
  idOccurrence : number
}

@Component({
  selector: 'app-p5',
  templateUrl: './p5.component.html',
  styleUrls: ['./p5.component.css']
})

export class P5Component implements OnInit {
  
  @Input() iD: any

  data1: any[] = [];
  data2: any [] = [];
  data3: any [] = [];
  data5: any [] = [];
  data6: any [] = [];
  data7: any [] = [];
  data8: any [] = [];
  data9: number [] = [];
  data10: any [] = [];
  data11: any [] = [];

  dataSelected: any [] = [];

  data13: any ;
  data12: boolean = false
  arrayIdNote: IidNote[] = [];
  selectedOccurence: number = -1;
  idObj: number = -1;
  itemSelected: any;
  march: any
  note: any;
  valueBoolean: boolean = false;
  contrat = new contratModel();
  agent = new agentModel();
  domaineList: any[] = [];

  noteTotal: number = 0.0;
  noteColor!: string;
  perms: any [] = [];

  

  constructor(
    private _empService:  ContratService,
    private toast: ToastrService,
    private spinner : NgxSpinnerService,
    private permissionsService: NgxPermissionsService,

  ){
    console.log(this.data);
    console.log(this.data4)
    
  };

  ngOnInit(){
    this.getContratByIdAgent();
    this.perms.push(this.data.fonction)
    this.permissionsService.loadPermissions(this.perms)
    console.log(this.perms)
 
  }
   
   data  = JSON.parse(localStorage.getItem("donnée")!);
   data4 = JSON.parse(localStorage.getItem("contrat")!)


  CreateContrat(){
    this.contrat.matricule_evalue = this.data.matricule;
    this.contrat.estitulaire = "titulaire";
    this.contrat.statut_contrat = "initié";
    this.contrat.annee_contrat = new Date();
    this.contrat.creepar = this.data.nom;
    this.agent.id = this.data.id
    this.contrat.agent = this.agent
    console.log(this.contrat);
    if (this.contrat ) {
      //Ajout contrat
     // this.spinner.show();
       this._empService
        .AddContrat(this.contrat)
        .pipe(take(1))
        .subscribe((res) => {
          console.log(res)
            if(res.reponse.code === '202') {
                 console.log('Contrat enregistrée!');
                 this.toast.success("Contrat créé");
                 this.data3 = res.data;
                 console.log(this.data3);
                 localStorage.setItem('contrat',JSON.stringify(this.data3));
                // this.spinner.hide()
                 console.log('Success!','Enregistrement effectué avec succès!');
              }else if (res.reponse.code === '500') {
                console.log("enrégistrement échoué!");
                this.toast.error("Création du contrat échoué")
              };
        },
        (error) =>{ console.log('Erreur!','Erreur lors de la saisir des champs requis !');
            console.log("Erreur lors de l'ajout de l'utilisateur !");
            this.toast.error("Création du contrat échoué")
            console.log(error);
          }
        );
    }else{
      console.log('Veuillez renseigner les champs requis !');
      console.log('Erreur', 'Veuillez renseigner les champs requis');
    }
  };


 




    showNote(){
      if(this.data5.length !== 0 ){
       this.data10 =  this.data5.map( item => item.note_obtenue * item.note_alloue/100);
       console.log(this.data10);
       for(let i = 0; i < this.data10.length; i++){
        this.note =+ this.data10[i];
       };
       this.march = this.note
       console.log(this.march);
       this.valueBoolean = true;
      }
    }
   
  
 
   

    getContratByIdAgent(){
      this._empService.getContratByAgent(this.data.id)
      .pipe(take(1))
      .subscribe(
        (res: any) => {
          if (res.reponse.code === '200') {
            console.log("Contrat rétournés!");
            this.domaineList = res.data[0].domaines;
            this.noteTotal = this.recupereDomaine()
            this.data13 = res.data;
            console.log(this.data13)
          } else {
            console.log("Contrat non récuperés");
          }
        },
        (error: any) => console.log(error)
      )
     };
     
     recupereDomaine(){
      let noteTotal = 0;

       this.domaineList.forEach((item: any) => {
        noteTotal = noteTotal + this.recupereCritere(item.critereWrappers);
      }) 
    
      return noteTotal
     };

     recupereCritere(critereWrapper: any[]){
       let noteTotal = 0;

       critereWrapper.forEach((item: any) => {
         noteTotal = noteTotal + this.recupereObjectif(item.objectifWrappers)
      })
      
     return noteTotal;
    };
     
     recupereObjectif(objectifWrapper: any []){
      let noteTotal = 0 ;

      objectifWrapper.forEach((item : any, idx: any) => {
        noteTotal = noteTotal + ( item.note_alloue * item.note_obtenue / 100 )
        this.dataSelected.push({idx: this.getIndex(item.occurrenceWrappers, item.idOccurrence),idObj: item.idObjectif, note1:  item.note_obtenue, note2: item.note_alloue});
        this.arrayIdNote.push({id: item.idObjectif, note_obtenue: item.note_obtenue, idOccurrence : item.idOccurrence});
      })

      return noteTotal;
     }


     getIndex(occurrenceWrappers: any[], idOccurence: any) {   
      return occurrenceWrappers.findIndex((item: any) => item.idOccurence === idOccurence);
     }
    
  updateContrat(){
      //Ajout contrat
       this._empService
        .updateContrat(this.arrayIdNote)
        .pipe(take(1))
        .subscribe((res) => {
          console.log(res)
          this.toast.success("Contrat validé")
        
            if(res.reponse.code === '200') {
                 console.log('Modification enregistrée!');
                 this.toast.success("Contrat évalué")
                 console.log('Success!','Enregistrement effectué avec succès!');
              }else if (res.reponse.code === '500') {
                console.log("enrégistrement échoué!");
                this.toast.error("Validation du contrat échoué");
              }
        },
        (error) =>{ console.log('Erreur!','Erreur lors de la saisir des champs requis !');
            console.log("Erreur lors de l'ajout de l'utilisateur !");
            this.toast.error("Validation du contrat échoué");
            console.log(error);
          }
        );
  };
  
 

  collecterIDetNotes(id: number, note: number, idOccurrence : number){
    var idNote: IidNote = {
      id: id,
      note_obtenue: note,
      idOccurrence 

    };
    if(this.arrayIdNote.length === 0){
      this.arrayIdNote.push(idNote);
    }else{
      this.arrayIdNote = this.arrayIdNote.filter( value => value.id !== id )
      this.arrayIdNote.push(idNote);
    }
  };
  
  toggleClass(id: number, obj: any, noteObtenue: number, noteAlloue: number, idOccurrence : number) {
    const rs: any[] = this.dataSelected.filter((it: any) => it.idObj === obj.idObjectif);
    if(rs.length > 0) {

      this.dataSelected = this.dataSelected.filter((it: any) => it.idObj != obj.idObjectif);
      this.dataSelected.push({idx: id, idObj: obj.idObjectif, note1: noteObtenue, note2: noteAlloue});

      this.arrayIdNote = this.arrayIdNote.filter((itemArrNote: any) => itemArrNote.id != obj.idObjectif);
      this.arrayIdNote.push({id: obj.idObjectif, note_obtenue: noteObtenue, idOccurrence: idOccurrence});

    } else {
      this.dataSelected.push({idx: id, idObj: obj.idObjectif, note1: noteObtenue, note2: noteAlloue});
      this.arrayIdNote.push({id: obj.idObjectif, note_obtenue: noteObtenue, idOccurrence: idOccurrence});
    }


    let tmpNote = 0; 
    this.noteTotal = 0;
    this.dataSelected.forEach((value: any) => {
      tmpNote += (value.note1 * value.note2) / 100
    });

    this.noteTotal = Number(tmpNote.toFixed(2));
    if(this.noteTotal <=2.5){
      this.noteColor = 'red' ;
    }else if ( 2.5<= this.noteTotal || this.noteTotal <=4 ){
      this.noteColor = 'yellow' ;
    } else if( 4 < this.noteTotal ){
      this.noteColor = 'green '
    }
  };

  check(id: number, idObj: number) {
    const rs: any[] = this.dataSelected.filter((it: any) => (it.idx === id && it.idObj === idObj));
    return (rs.length > 0);
  };
   


  updateContratS(id: number){
    this.contrat.id = id;
    this.contrat.statut_contrat = "soumis" ;
    this.contrat.date_soumis = new Date() 
    this.spinner.show()
    this._empService
        .updateContrats(this.contrat)
        .pipe(take(1))
        .subscribe((res) => {
          console.log(res)
            if(res.reponse.code === '200') {
                 console.log('Modification enregistrée!');
                 this.toast.success("Contrat soumis");
                 this.spinner.hide()
                // this.getAllAnneeList();
              }else if (res.reponse.code === '500') {
                console.log("Erreur serveur, modification échouée!");
                this.toast.error("Erreur serveur, soumission du contrat échouée");
              }
        },
        (error) =>{ console.log('Erreur!','Erreur lors de la saisir des champs requis !');
            console.log("Erreur lors de l'ajout de l'utilisateur !");
            this.toast.error("Validation échouée");
            console.log(error);
          }
        );
   };
}

  function recupereObjectif() {
    throw new Error('Function not implemented.');
  }

