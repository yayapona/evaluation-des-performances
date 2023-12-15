import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { httpOptions } from '../../utils/constante';

@Injectable({
  providedIn: 'root'
})
export class IndicateurService {

  constructor(
    private _http: HttpClient,
    private api: ApiService
  ) { }

  AddIndicateur(data?: any): Observable<any>{
    return this.api._post('evaluationagent/addindicateur',data, httpOptions)
  }; 

  getAllIndicateurList(data?: any): Observable<any>{
    return this.api._get('evaluationagent/getAllindicateur',data, httpOptions)
  };

  getIndicateurById(id:number ,data?: any): Observable<any>{
    return this.api._get('evaluationagent/getIndicateurById/'+ id,data, httpOptions)
  };

  updateIndicateur(data?: any): Observable<any>{
    return this.api._put('evaluationagent/updateIndicateur', data, httpOptions)
  };
  
  deleteIndicateur(data?: any): Observable<any>{
    return this.api._post('evaluationagent/deleteIndicateurById',data, httpOptions)
  }

}
