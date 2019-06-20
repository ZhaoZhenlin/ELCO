import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '../component/confirm-dialog/confirm-dialog.component';
import { DeviceService } from '../service/device.service';
import { Device } from '../vo/device';
import { PropAddDialogComponent } from '../component/prop-add-dialog/prop-add-dialog.component';
import { PropAddForm } from '../interface/PropAddForm';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../component/snack-bar/snack-bar.component';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { PropDelOp } from '../vo/propDelOp';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {

  // deviceForm: any;

  device: Device = new Device('');
  devType: string;

  sensors = []; // 属性数组
  configs = [];
  actions = [];

  public currentCheckedProp = ''; //当前选中属性

  /**
   * 构造
   * @param deviceService
   * @param route 
   * @param router 
   * @param dialog 
   */
  constructor(
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private localStorage: LocalStorage) {
  }

  /**
   * 页面初始化
   */
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let devId = params.get('id');
      console.log(`devId:${devId}`);
      this.deviceService.getDevice(devId).subscribe(dev => {
        // for (const prop in devs.properties) {
        //   if (prop.indexOf('_') !== 0) {
        //     this.sensors.push(prop);
        //   } else {
        //     this.configs.push(prop);
        //   }
        // }
        // for (const action in devs.actions) {
        //     this.actions.push(actions);
        // }
        console.log(dev);
        console.log(dev['@type']);
        let type = dev['@type'];
        let type0 = type[0];
        // console.log(`111: ${type0}`);
        if(type0 == "elco-iot"){
          let type1 = type[1];
          type0 = `${type0} (${type1})`; 
        }else{
          type0 = dev['@type'];
        }
        type0 = type0.substring(0,1).toUpperCase() + type0.substring(1);
        console.log(`type0: ${type0}`);
        this.devType = type0;
        this.renderView(dev);
      });
    });
  }

  /**
   * 呈现数据
   * @param dev 
   */
  renderView(dev: any): void {
    this.device = dev;
    for (const prop in dev.properties) {
      if (prop.indexOf('_') == 0) {
        // this.configs.push(prop);
      } else {
        this.sensors.push(prop);
      }
    }
  }

  /**
   * 新增属性 事件处理
   */
  addPropHandler(): void {
    console.log(`device id:${this.device.id}`);
    console.log(`device name:${this.device.name}`);
    const dialogRef = this.dialog.open(PropAddDialogComponent, {
      disableClose: true,
    });
    dialogRef.componentInstance.device = this.device;
    dialogRef.afterClosed().subscribe(formValue => {
      if (formValue != 'cancel') {
        console.log(formValue);
        let _name = formValue.name;
        let _type = formValue.type;
        let _writable = formValue.writable;
        let _observable = formValue.observable;
        let devId = this.device.id;
        // console.log(`devId: ${devId}`);
        // console.log(`_name: ${_name}`);
        // console.log(`_type: ${_type}`);
        // console.log(`_writable: ${_writable}`);
        // console.log(`_observable: ${_observable}`);
        //封装数据
        let prop: PropAddForm = {
          name: _name,
          type: _type,
          writable: _writable == 'true',
          observable: _observable == 'true'
        }
        //调用service
        this.deviceService.addProp(devId, prop).subscribe(
          //处理成功
          res => {
            console.log('HTTP response', res);
            this.sensors = [];
            this.deviceService.getDevice(devId).subscribe(dev => {
              this.renderView(dev);
            });
          },
          //处理失败
          err => {
            console.log('HTTP Error', err)
            let status = err.status;
            console.log(status);
            if (status == 400) {
              let statusText = err.statusText;
              let msg = err.error.error;
              console.log(statusText);
              console.log(msg);
              this._snackBar.openFromComponent(SnackBarComponent, {
                duration: 5000, // 错误信息显示时间: 5s
                data: `${status} ${statusText} ${msg}`
              });
            }
          },
          () => {
            console.log('HTTP request completed.')
          }
        );
      }
    });
  }

  /**
   * 删除属性 事件处理
   */
  removePropHandler(): void {
    if (this.currentCheckedProp == '') {
      return;
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    dialogRef.componentInstance.confirmMessage = `Remove Prop: ${this.currentCheckedProp}`;

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        let propName = this.currentCheckedProp;
        // console.log(`Remove Prop: ${propName}`);
        let deviceId = this.device.id;

        if (this.deviceService.isOnline) {
          console.log('is online');
          this.deviceService.removeProp(deviceId, propName).subscribe(() => {
            this.sensors = [];
            this.deviceService.getDevice(deviceId).subscribe(dev => {
              this.renderView(dev);
            });
          });
        } else {
          console.log('is offline');
          console.log("cache to localStorage");
          //取出缓存操作
          this.localStorage.getItem('delete_operation').subscribe(data => {
            var array = [];
            console.log(`data: ${data}`);
            //如果数据不为空，转为数组
            if (data != null) {
              array = <[]>data;
            }
            //新增操作
            let deleteOperation = deviceId + "_:_"+propName;
            //如果不存在,则加入数组
            if(array.indexOf(deleteOperation)<0){
              array.push(deleteOperation);
            }
            console.log(`array 2222: ${array}`);
            //写入缓存
            this.localStorage.setItem('delete_operation', array).subscribe(() => { 
              this._snackBar.openFromComponent(SnackBarComponent, {
                duration: 3000, // 错误信息显示时间: 5s
                data: `Operation has been added to cache`
              });
            });
            // }
          });
        }

      }
    });
  }

  /**
   * 删除设备 事件处理
   */
  deleteDeviceHandler(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    dialogRef.componentInstance.confirmMessage = `Delete: ${this.device.name}`

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // console.log('delete device');
        this.delete_device();
      }
    });
  }

  private delete_device(): void {
    let id = this.device.id;
    console.log(`delete_device, id: ${id}`);
    this.deviceService.delDevice(id).subscribe(() => {
      //路由跳转
      this.router.navigateByUrl('/device');
    });
  }

  /**
   * 勾选框事件处理
   * @param prop 
   */
  checkDelete(prop: string): void {
    // console.log(`checkDelete:${prop}`);
    if (this.currentCheckedProp == prop) {
      this.currentCheckedProp = '';
    } else {
      this.currentCheckedProp = prop;
    }
  }

  /**
   * 勾选框状态
   * @param prop 
   */
  public isChecked = (prop: string) => {
    // console.log('isChecked....');
    return this.currentCheckedProp == prop;
  }
}
