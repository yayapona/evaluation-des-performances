import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { httpOptions } from '../../utils/constante';


@Injectable({
  providedIn: 'root'
})
export class DomaineService {

  constructor(
    private _http: HttpClient,
    private api: ApiService
  ) { }

  AddDomaine(data?: any): Observable<any>{
    return this.api._post('evaluationagent/addDomaine',data, httpOptions)
  }; 

  getAllDomaineList(data?: any): Observable<any>{
    return this.api._get('evaluationagent/getAllDomaine',data, httpOptions)
  };

  getDomaineById( id:any,data?: any): Observable<any>{
    return this.api._get('evaluationagent/getDomaineById/'+ id,data, httpOptions)
  };

  updateDomaine(data?: any): Observable<any>{
    return this.api._put('evaluationagent/updateDomaine', data, httpOptions)
  };
  
  deleteDomaine(data?: any): Observable<any>{
    return this.api._post('evaluationagent/deleteDomaine',data, httpOptions)
  }
}
