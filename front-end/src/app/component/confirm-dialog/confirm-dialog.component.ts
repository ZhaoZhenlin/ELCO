import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  /**
   * 提示文字信息
   */
  public confirmMessage: string;

  /**
   * 构造
   * @param dialogRef
   */
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {
  }

}
