import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service'
import { httpOptions } from '../../utils/constante'

@Injectable({
  providedIn: 'root'
})
export class DirectionService {

  constructor(
    private _http: HttpClient,
    private api: ApiService) { }

  
  AddDirection(data?: any): Observable<any>{
      return this.api._post('evaluationagent/addDirection',data, httpOptions)
  };  
  AddChiefDirection(data?: any): Observable<any>{
      return this.api._post('evaluationagent/addDirecteur',data, httpOptions)
  };  

  getAllDirectionList(data?: any): Observable<any>{
    return this.api._get('evaluationagent/getAllDirection',data, httpOptions)
  };

  getDirectionById(data?: any): Observable<any>{
    return this.api._get('evaluationagent/getAllDirection',data, httpOptions)
  };

  getNombreDirection(data?: any): Observable<any>{
    return this.api._get('evaluationagent/nombreDirection',data, httpOptions)
  };

  updateDirection(data?: any): Observable<any>{
    return this.api._put('evaluationagent/updateDirection', data, httpOptions)
  };
  updateChiefDirection(data?: any): Observable<any>{
    return this.api._put('evaluationagent/updateDirection', data, httpOptions)
  };

  deleteDirection(data?: any): Observable<any>{
    return this.api._post('evaluationagent/deleteDirectionById',data, httpOptions)
  }
}
