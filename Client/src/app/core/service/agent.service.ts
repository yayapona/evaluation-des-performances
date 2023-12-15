import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { httpOptions } from '../../utils/constante';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  constructor(
    private _http: HttpClient,
    private api: ApiService
    ){}
  
  loginAgent(data?: any): Observable<any> {
      return this.api._postLogin('evaluationagent/conexionagent', data, httpOptions)
  };

  logOut(data?: any): Observable<any> {
      return this.api._postLogin('evaluationagent/deconnexionagent', data, httpOptions)
  }

  AddAgent(data?: any): Observable<any>{
    return this.api._post('evaluationagent/addAgent',data, httpOptions)
  };

  getAgentList(data?: any): Observable<any>{
    return this.api._get('evaluationagent/getAllAgent',data, httpOptions)
  };

 

  getAllCollaborateurs(matricule:any, data?: any): Observable<any>{
    return this.api._get('evaluationagent/getCollaborateur/' +  matricule ,data, httpOptions)
  };

  getAgentNombre (data?: any): Observable<any>{
    return this.api._get('evaluationagent/nombreAgent', data, httpOptions)
  };

  
  updateAgent(data?: any): Observable<any>{
    return this.api._put('evaluationagent/updateAgent', data, httpOptions)
  };

  
  deleteAgent(data?: any): Observable<any>{
    return this.api._post('evaluationagent/deleteById' , data, httpOptions)
  }
}
