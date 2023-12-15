import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { httpOptions } from '../../utils/constante';

@Injectable({
  providedIn: 'root'
})
export class OccurenceService {

  constructor(
    private _http: HttpClient,
    private api: ApiService
  ) { };

  AddOccurence(data?: any): Observable<any>{
    return this.api._post('evaluationagent/addOccurence',data, httpOptions)
  }; 

  getAllOccurence(data?: any): Observable<any>{
    return this.api._get('evaluationagent/getAllOccurrence',data, httpOptions)
  };

  getOccurenceById(id: number ,data?: any): Observable<any>{
    return this.api._get('evaluationagent/getOccurenceById/'+ id,data, httpOptions)
  };

  updateOccurence(data?: any): Observable<any>{
    return this.api._put('evaluationagent/updateoccurence', data, httpOptions)
  };
  
  deleteOccurence(data?: any): Observable<any>{
    return this.api._post('evaluationagent/deleteOccurence',data, httpOptions)
  }
}
