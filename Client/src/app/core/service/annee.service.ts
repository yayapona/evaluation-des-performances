import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service'
import { httpOptions } from '../../utils/constante';

@Injectable({
  providedIn: 'root'
})
export class AnneeService {

  constructor(
    private _http: HttpClient,
    private api: ApiService
  ) { }

  AddAnnee(data?: any): Observable<any>{
    return this.api._post('evaluationagent/addAnnee',data, httpOptions)
  }; 

  getAllAnneeList(data?: any): Observable<any>{
    return this.api._get('evaluationagent/getAllAnnee',data, httpOptions)
  };
  getAnneeById(id:any, data?: any): Observable<any>{
    return this.api._get('evaluationagent/getAnneeById/'+ id,data, httpOptions)
  };

  updateAnnee(data?: any): Observable<any>{
    return this.api._put('evaluationagent/updateAnnee', data, httpOptions)
  };

  deleteAnnee(data?: any): Observable<any>{
    return this.api._post('evaluationagent/deleteAnneById',data, httpOptions)
  }
}
