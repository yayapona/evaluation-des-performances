import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service'
import { httpOptions } from '../../utils/constante';

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  constructor(
    private _http: HttpClient,
    private api: ApiService
  ) { }

  
  AddContrat(data?: any): Observable<any>{
    return this.api._post('evaluationagent/addcontrat',data, httpOptions)
  }; 

  getAllContratList(data?: any): Observable<any>{
    return this.api._get('evaluationagent/getAllContrat',data, httpOptions)
  };
  
  getAllContratListById(id: any ,data?: any): Observable<any>{
    return this.api._get('evaluationagent/getcontratByIdAgent/'+ id ,data, httpOptions)
  };

  getContratByAgent(id:any, data?: any): Observable<any>{
    return this.api._get('evaluationagent/getcontratByIdAgent/'+ id ,data, httpOptions)
  };

  getContratNombre(data?: any): Observable<any>{
    return this.api._get('evaluationagent/nombreContrat' ,data, httpOptions)
  };
  
  updateContrat(data?: any): Observable<any>{
    return this.api._put('evaluationagent/updateobjectifs', data, httpOptions)
  };

  updateContrats(data?: any): Observable<any>{
    return this.api._put('evaluationagent/updateContrats', data, httpOptions)
  };

  deleteContrat(data?: any): Observable<any>{
    return this.api._post('evaluationagent/deleteContratById',data, httpOptions)
  }

}
