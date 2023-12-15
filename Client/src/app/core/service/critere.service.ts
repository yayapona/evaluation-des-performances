import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service'
import { httpOptions } from '../../utils/constante'

@Injectable({
  providedIn: 'root'
})
export class CritereService {

  constructor(
    private _http: HttpClient,
    private api: ApiService
  ) { }

  AddCritere(data?: any): Observable<any>{
    return this.api._post('evaluationagent/addcritere',data, httpOptions)
  }; 

  getAllCritereList(data?: any): Observable<any>{
    return this.api._get('evaluationagent/getAllcritere',data, httpOptions)
  };


  getAllCritereBydomaine1(data?: any): Observable<any>{
    return this.api._get('evaluationagent/getcritereByIdDomaine1/1',data, httpOptions)
  };
  getAllCritereBydomaine2(data?: any): Observable<any>{
    return this.api._get('evaluationagent/getcritereByIdDomaine2/2',data, httpOptions)
  };
  getAllCritereBydomaine3(data?: any): Observable<any>{
    return this.api._get('evaluationagent/getcritereByIdDomaine3/3',data, httpOptions)
  };
  getAllCritereBydomaine4(data?: any): Observable<any>{
    return this.api._get('evaluationagent/getcritereByIdDomaine4/4',data, httpOptions)
  };

  getCritereById(data?: any): Observable<any>{
    return this.api._get('evaluationagent/getcritereByIdDomaine4/4',data, httpOptions)
  };

  getCritereId(id: number,data?: any): Observable<any>{
    return this.api._get('evaluationagent/getCritereById/'+ id,data, httpOptions)
  };

  

  updateCritere(data?: any): Observable<any>{
    return this.api._put('evaluationagent/updateCritere', data, httpOptions)
  };
  
  deleteCritere(data?: any): Observable<any>{
    return this.api._post('evaluationagent/deleteCritere',data, httpOptions)
  }
}
