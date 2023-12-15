import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service'
import { httpOptions } from '../../utils/constante'

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  constructor(
    private _http: HttpClient,
    private api: ApiService
    ){}

  loginAdministrator(data?: any): Observable<any> {
      return this.api._postLogin('evaluationagent/connexion', data, httpOptions)
  }
  
  signupAdministrator(data?: any): Observable<any>{
    return this.api._post('evaluationagent/addUsager',data, httpOptions)
  };
}
