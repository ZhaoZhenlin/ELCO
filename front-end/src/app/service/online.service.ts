import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnlineService {

  // 连接状态改变
  private connStatus = new Subject<boolean>();

  get connChanged() {
    return this.connStatus.asObservable();
  }

  /* get isOnline() {
    return window.navigator.onLine;
  } */

  constructor() {
    console.log('OnlineService constructor()...');
    // online
    window.addEventListener('online', () => {
      this.updateOnlineStatus();
    });
    // offline
    window.addEventListener('offline', () => {
      this.updateOnlineStatus();
    });
  }

  private updateOnlineStatus() {
    this.connStatus.next(window.navigator.onLine);
  }

}
