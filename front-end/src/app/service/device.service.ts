import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PropAddForm } from '../interface/PropAddForm';
import { OnlineService } from './online.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { SnackBarComponent } from '../component/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

const token = sessionStorage.getItem('jwt-token');
const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  baseUrl = environment.baseUrl; // 项目访问路径前缀

  public isOnline = true; // 在线/离线状态

  public constructor(
    private http: HttpClient,
    private onlineService: OnlineService,
    private localStorage: LocalStorage,
    private _snackBar: MatSnackBar,) {
      console.log('DeviceService constructor()...');
      this.regEvent(onlineService);
  }

  /** 
   * 注册 onlineService
   * @param onlineService 
   */
  private regEvent(onlineService: OnlineService) {
    onlineService.connChanged.subscribe(online => {
      this.isOnline = online;
      // console.log(`online:${this.isOnline}`);
      if (online) {
        console.log('app online : ' + new Date());
        //取出缓存操作
        this.localStorage.getItem('delete_operation').subscribe(data=>{
          var array = [];
          console.log(`data: ${data}`);
          //如果数据不为空，转为数组
          if (data != null) {
            array = <[]>data;
            //循环处理
            for(var i =0; i<array.length;i++){
              array.forEach(oper => {
                console.log(`oper: ${oper}` );
                let pos = oper.indexOf('_:_');
                let deviceId = oper.substring(0, pos);
                let propName = oper.substring(pos+3);
                console.log(`deviceId: ${deviceId}`);
                console.log(`propName: ${propName}`);
                if(i<array.length-1){
                  //不是最后一个oper元素
                  this.removeProp(deviceId, propName).subscribe(() => {
                    this._snackBar.openFromComponent(SnackBarComponent, {
                      duration: 3000, // 错误信息显示时间: 5s
                      data: `Property ${propName} has been deleted from device ${deviceId}`
                    });
                  });
                }else{
                  //最后一个oper元素
                  this.removeProp(deviceId, propName).subscribe(() => {
                    this._snackBar.openFromComponent(SnackBarComponent, {
                      duration: 3000, // 错误信息显示时间: 5s
                      data: `Property ${propName} has been deleted from device ${deviceId}`
                    });
                    //清空操作缓存
                    this.localStorage.setItem('delete_operation', []).subscribe(()=>{
                      //2秒刷新页面
                      setTimeout(() => {
                        window.location.reload();
                      }, 2000);
                    });
                  });
                }
              });
            }
          }
        });
      } else {
        console.log('app offline : ' + new Date());
      }
    });
  }

  getToken(): string {
    return token;
  }

  getDevices(): Observable<any> {
    return this.http.get(`${this.baseUrl}/v0/things`, { headers });
  }

  getDevice(id: string): Observable<any> {
    // console.log(id);
    return this.http.get(`${this.baseUrl}/v0/things/${id}`, { headers });
  }

  addDevice(name: string, type: string): Observable<any> {
    console.log('DeviceService addDevice()...');
    let typeArray = [];
    typeArray.push(type);
    return this.http.post(`${this.baseUrl}/v0/things`, { 'name': `${name}`, '@type': typeArray }, { headers });
  }

  delDevice(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/v0/things/${id}`, { headers });
  }

  removeProp(id: string, prop: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/v0/things/${id}/properties/${prop}`, { headers });
  }

  addProp(devId: string, prop: PropAddForm): Observable<any> {
    return this.http.post(`${this.baseUrl}/v0/things/${devId}/properties`, prop, { headers });
  }

}
