import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  loginHandler() {
    console.log(`username:${this.f.username.value}`);
    console.log(`password:${this.f.password.value}`);
    this.loginService.login(this.f.username.value, this.f.password.value).subscribe((res) => {
      // 把token存到sessionStorage里面
      sessionStorage.setItem('jwt-token', res.Token); // 存储数据
      const dataAll = sessionStorage.valueOf(); // 获取全部数据
      console.log(dataAll, '获取全部数据');
      console.log(res); // response data (token)
      //路由跳转
      this.router.navigateByUrl('/launch');
    });
  }

}
