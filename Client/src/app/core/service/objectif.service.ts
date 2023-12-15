import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service'
import { httpOptions } from '../../utils/constante'


@Injectable({
  providedIn: 'root'
})
export class ObjectifService {

  constructor(
    private api: ApiService

  ) { }

  AddObjectif(data?: any): Observable<any>{
    return this.api._post('evaluationagent/addObjectif',data, httpOptions)
  };
  
  
  getAllObjectif(data?: any): Observable<any>{
    return this.api._get('evaluationagent/getAllObjectif',data, httpOptions)
  };

  updateObjectif(data?: any): Observable<any>{
    return this.api._put('evaluationagent/updateObjectifs' , data, httpOptions)
  };
  
  getAllObjectifByContratId( id: any, data?: any): Observable<any>{
    return this.api._get('evaluationagent/getObjectifBycontrat/'+ id ,data, httpOptions)
  };

  getObjectifById( id: any, data?: any): Observable<any>{
    return this.api._get('evaluationagent/getObjectifById/'+ id ,data, httpOptions)
  };

  
 

  deleteObjectif(data?: any): Observable<any>{
    return this.api._post('evaluationagent/deleteObjectif', data, httpOptions)
  }
}
