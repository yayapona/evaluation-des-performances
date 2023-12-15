import { Component } from '@angular/core';
import { Router} from "@angular/router";
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { AgentService } from 'src/app/core/service/agent.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { agentLoginModel } from 'src/app/model/agentLogin';
import { take } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
   
  loginForm!: FormGroup;
  user = new agentLoginModel();
  data!: any
  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private _empService: AgentService,
    private spinner : NgxSpinnerService, 
    private toast : ToastrService

    ){
      this.loginForm = _fb.group({
        email: ['', Validators.required],
        matricule: ['',Validators.required]
      })
     }

  ngOnInit(): void {
  }

  onLogin(){
    this.user.email = this.loginForm.get("email")?.value;
    this.user.matricule = this.loginForm.get("matricule")?.value;
  
    console.log(this.user);
    if (this.user.email.length > 4 && this.user.email.length > 0) {
      //Ajout User
      this.spinner.show();
      this._empService
        .loginAgent(this.user)
        .pipe(take(1))
        .subscribe(
          (res) => {
            console.log(res)
            if (res.reponse.code === '200') {
              console.log('Agent connecté!');
              this.data = res.data
              console.log(this.data);
              if(this.data.role !== 'utilisateur') {
                this.router.navigate(['/home/p8']);
              }else {
                this.router.navigate(['/home']);
              }
              localStorage.setItem('donnée',JSON.stringify(this.data));
            } else if (res.reponse.code === '500') {
              this.spinner.hide();
              this.toast.error("connexion échoué")
              console.log("la connexion de l'agent a échoué !");
            }
          },
          (error) => { console.log('Erreur!','Erreur lors de la saisir des champs requis !');
             this.spinner.hide();
             this.toast.error("connexion échoué")
            console.log("Erreur lors de l'ajout de l'utilisateur !");
            console.log(error);
          }
        );
    } else {
      console.log('Veuillez renseigner les champs requis !');
      console.log('Erreur', 'Veuillez renseigner les champs requis');
    }
  }
}
