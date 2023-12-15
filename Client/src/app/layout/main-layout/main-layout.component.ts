import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, Router } from "@angular/router";
import { take } from 'rxjs';
import { AgentService } from 'src/app/core/service/agent.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { agentdeconnexion } from 'src/app/model/agentModalDeconnexion';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {


  agentModel = new agentdeconnexion(); 
  perms: any [] = [];
  constructor(
    private router: Router,
    private agent: AgentService,
    private permissionsService: NgxPermissionsService,
    ) { }
  
  
  ngOnInit() {
    this.perms.push(this.data.fonction)
    this.permissionsService.loadPermissions(this.perms)
    console.log(this.data);
    console.log(this.perms)
  };
  data = JSON.parse(localStorage.getItem("donnée")!)
  
 
  
  logOut(){
    this.agentModel.email = this.data.email;
    this.agentModel.matricule = this.data.matricule
      this.agent
        .logOut(this.agentModel)
        .pipe(take(1))
        .subscribe(
          (res) => {
            console.log(res)
            if (res.reponse.code === '200') {
              console.log('Agent deconnecté!');
              this.router.navigate(['/auth'])
            } else if (res.reponse.code === '500') {
              console.log("Deconnexion échoué !");
            }
          },
          (error) => { console.log('Erreur!','Erreur lors de la saisir des champs requis !');
            console.log("Erreur lors de l'ajout de l'utilisateur !");
            console.log(error);
          }
        );
    
  }

}
