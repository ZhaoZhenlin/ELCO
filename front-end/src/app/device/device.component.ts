import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceService } from '../service/device.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  devices = [];

  constructor(private deviceService: DeviceService, private router: Router) { }

  ngOnInit() {
    console.log("DeviceComponent ngOnInit...");
    this.deviceService.getDevices().subscribe(devs => this.devices = devs);
  }

  addDevice() {
    //路由跳转
    this.router.navigateByUrl('/deviceAdd');
  }

}
