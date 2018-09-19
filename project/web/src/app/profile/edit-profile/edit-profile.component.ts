import { DialogComponent } from './../dialog/dialog.component';
import { AuthService } from './../../auth.service';

import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Profile } from '../../../common/define';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  profile: Profile;
  constructor( 
    private authService: AuthService,
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public modifyPwdDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  async ngOnInit() {
    try {
      this.profile = await this.profileService.getProfile();
      if(this.profile.userId == null) {
        this.profile.userId = this.authService.getUserId();
      }
    } catch(err) {
      console.log('获取个人信息失败', err);
    }
  }

  modifyPwd(): void {

    const dialog = this.modifyPwdDialog.open(DialogComponent, {
      data: { name: this.authService.getUserId() }
    });

    dialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
  cancel(): void {
    console.log(this.profile.birthday);
    this.dialogRef.close('取消');
  }

  async save() {
    try {
      await this.profileService.updateProfile(this.profile);
    } catch(err) {
      console.log('更新个人资料失败');
    }
    this.dialogRef.close('修改个人资料成功')
  }

  public submitForm(event) {
    console.log(event);
  }

}
