import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service'
import { httpOptions } from '../../utils/constante'

@Injectable({
  providedIn: 'root'
})
export class SousDirectionService {

  constructor(
    private _http: HttpClient,
    private api: ApiService
  ) { }

  AddSousDirection(data?: any): Observable<any>{
    return this.api._post('evaluationagent/addSousDirection',data, httpOptions)
  }; 
  
  AddChiefSousDirection(data?: any): Observable<any>{
    return this.api._post('evaluationagent/addSousDirecteur',data, httpOptions)
  }; 
  
  getAllSousDirectionList(data?: any): Observable<any>{
    return this.api._get('evaluationagent/getAllSousDirection',data, httpOptions)
  };

  getSousDirectionById( id:any, data?: any): Observable<any>{
    return this.api._get('evaluationagent/getSousDirectionByIdDirection'+ id,data, httpOptions)
  };
  
  getSousDirectionNombre( data?: any): Observable<any>{
    return this.api._get('evaluationagent/nombreSousDirection' ,data, httpOptions)
  };

  updateSousDirection(data?: any): Observable<any>{
    return this.api._put('', data, httpOptions)
  };

  updateChiefSousDirection(data?: any): Observable<any>{
    return this.api._put('', data, httpOptions)
  };

  deleteSousDirection(data?: any): Observable<any>{
    return this.api._post('evaluationagent/deleteSousDirectionById', data, httpOptions)
  }
}
