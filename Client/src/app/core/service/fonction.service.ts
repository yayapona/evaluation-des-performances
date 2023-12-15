import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { httpOptions } from '../../utils/constante';

@Injectable({
  providedIn: 'root'
})
export class FonctionService {

  constructor(
    private _http: HttpClient,
    private api: ApiService
  ) { }

  AddFonction(data?: any): Observable<any>{
    return this.api._post('evaluationagent/addFonction',data, httpOptions)
  }; 

  getAllChief(data?: any): Observable<any>{
    return this.api._get('evaluationagent/getAllDomaine',data, httpOptions)
  };

  getChiefById(data?: any): Observable<any>{
    return this.api._get('evaluationagent/getAllDomaine',data, httpOptions)
  };

  

  updateChief(data?: any): Observable<any>{
    return this.api._put('evaluationagent/updateDirection', data, httpOptions)
  };
  
  deleteChief(data?: any): Observable<any>{
    return this.api._post('evaluationagent/deleteById',data, httpOptions)
  }
}
