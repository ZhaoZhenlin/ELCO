import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeviceService } from '../service/device.service';

@Component({
  selector: 'app-device-add',
  templateUrl: './device-add.component.html',
  styleUrls: ['./device-add.component.css']
})
export class DeviceAddComponent implements OnInit {

  public form: FormGroup;

  constructor(private router: Router, private deviceService: DeviceService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      type: new FormControl('', [Validators.required]),
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  backToList() {
    //路由跳转
    this.router.navigateByUrl('/device');
  }

  add() {
    if (this.form.valid) {
      let _formValue = this.form.value;
      let _name = _formValue.name;
      let _type = _formValue.type;
      console.log('name:' + _name);
      console.log('type:' + _type);
      this.deviceService.addDevice(_name, _type).subscribe(() => {
        //路由跳转
        this.router.navigateByUrl('/device');
      });
    }
  }

}
