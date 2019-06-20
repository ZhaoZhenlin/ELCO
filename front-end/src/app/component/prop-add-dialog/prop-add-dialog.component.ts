import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DeviceService } from '../../service/device.service';
import { Device } from './../../vo/device';

@Component({
  selector: 'app-prop-add-dialog',
  templateUrl: './prop-add-dialog.component.html',
  styleUrls: ['./prop-add-dialog.component.css']
})
export class PropAddDialogComponent implements OnInit {

  public device: Device; // 当前设备信息
  public form: FormGroup; // 表单封装类
  public options: string[] = ['int8', 'int16', 'int32', 'uint8', 'uint16', 'uint32', 'float32', 'boolean', 'array'];
  public selectedType: string = '';

  writable: boolean = false;

  constructor(public dialogRef: MatDialogRef<PropAddDialogComponent>,
    private deviceService: DeviceService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      type: new FormControl('', [Validators.required]),
      writable: new FormControl('false', []),
      observable: new FormControl('false', []),
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

}
