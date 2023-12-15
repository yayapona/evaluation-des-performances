import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service'
import { httpOptions } from '../../utils/constante'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private _http: HttpClient,
    private api: ApiService
  ) { }

  AddService(data?: any): Observable<any>{
    return this.api._post('evaluationagent/addService',data, httpOptions)
  };
  AddChiefService(data?: any): Observable<any>{
    return this.api._post('evaluationagent/addChefService',data, httpOptions)
  };
  
  getAllServiceList(data?: any): Observable<any>{
    return this.api._get('evaluationagent/getAllService',data, httpOptions)
  };

  getServiceByIdt( id: number, data?: any): Observable<any>{
    return this.api._get('evaluationagent/getAllService/' + id,data, httpOptions)
  };

  getServiceNombre( data?: any): Observable<any>{
    return this.api._get('evaluationagent/nombreService',data, httpOptions)
  };

  updateService(data?: any): Observable<any>{
    return this.api._put('', data, httpOptions)
  };
  updateChiefService(data?: any): Observable<any>{
    return this.api._put('', data, httpOptions)
  };

  deleteService(data?: any): Observable<any>{
    return this.api._post('evaluationagent/deleteServicById', data, httpOptions)
  }


}
