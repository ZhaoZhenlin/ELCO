import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private router: Router) { }

  /**
   * 根目录的跳转逻辑:
   * 如果登录，进入设备列表页面;
   * 如果未登录，显示登录页面。
   */
  ngOnInit() {
    const token = sessionStorage.getItem('jwt-token');
    const isLoggedIn = token != null;
    if (isLoggedIn) {
      this.router.navigateByUrl('/device');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

}
