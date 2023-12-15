import {EventEmitter, Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EmitterDataService {

  dataToSend: any;

  public onChange: EventEmitter<any> = new EventEmitter<any>();


  public getChangeValue(msg: string): any {
    this.onChange.emit({message: msg, eventId: 10});
  }

  public setData(data: any): any {
    this.dataToSend = data;
  }

  public getData(): any {
    return this.dataToSend;
  }
}
