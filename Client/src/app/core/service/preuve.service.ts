import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { httpOptions } from '../../utils/constante';

@Injectable({
  providedIn: 'root'
})
export class PreuveService {

  constructor(
    private _http: HttpClient,
    private api: ApiService
  ) { };


  AddPreuve(data?: any): Observable<any>{
    return this.api._post('evaluationagent/addPreuveRealisation',data, httpOptions)
  }; 

  getAllPreuveList(data?: any): Observable<any>{
    return this.api._get('evaluationagent/getAllPreuveRealisation',data, httpOptions)
  };

  getPreuveById(id: number,data?: any): Observable<any>{
    return this.api._get('evaluationagent/getPreuveRealisationById/' + id,data, httpOptions)
  };

  updatePreuve(data?: any): Observable<any>{
    return this.api._put('evaluationagent/updatePreuveRealisation', data, httpOptions)
  };
  
  deletePreuve(data?: any): Observable<any>{
    return this.api._post('evaluationagent/deleteById',data, httpOptions)
  }


}
