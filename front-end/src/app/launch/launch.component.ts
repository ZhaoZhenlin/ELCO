import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceService } from '../service/device.service';

@Component({
  selector: 'app-launch',
  templateUrl: './launch.component.html',
  styleUrls: ['./launch.component.css']
})
export class LaunchComponent implements OnInit {

  constructor(private router: Router,
    private deviceService: DeviceService) { }

  ngOnInit() {
    console.log("LaunchComponent ngOnInit...");
    let token = this.deviceService.getToken();
    console.log(token);
    if (token == null) {
      window.location.reload();
    } else {
      //路由跳转
      this.router.navigateByUrl('/device');
    }
  }

}
