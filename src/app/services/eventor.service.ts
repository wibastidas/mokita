import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventorService {

  private events : any;

  emit(event, data){
    if (!this.events[event]){
      this.events[event] = new EventEmitter();
    }
    this.events[event].emit(data);
  }

  getEmitter(event){
    if (!this.events[event]){
      this.events[event] = new EventEmitter();
    }
    return this.events[event];
  }

  constructor() {
    this.events = [];
  }
}
