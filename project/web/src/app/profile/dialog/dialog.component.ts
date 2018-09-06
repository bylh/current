
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {


  constructor(
    public auth: AuthService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(this.data);
     }

  cancel(): void {
    this.dialogRef.close('取消');
  }

  async save(orgPwd: string, newPwd: string) {
    console.log(orgPwd, newPwd);
    try {
      await this.auth.resetPwd(orgPwd, newPwd);
    } catch(err) {
      return;
    }
    this.dialogRef.close('修改成功')
  }
  ngOnInit() {
  }

}
