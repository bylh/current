import { DBService } from './../db.service';

import { environment } from './../../environments/environment';

import { DialogComponent } from './dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material';
import { AuthService } from '../auth.service';
import axios from '../../common/rewrite/axios';
import { Profile } from '../../common/define';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  bgFile;
  avatarFile;

  profile: Profile;
  html = `<h2>显示图片</h2>`;

  userId: string;

  form: FormGroup;
  matcher = new MyErrorStateMatcher();
  constructor(
    public dbService: DBService,
    public auth: AuthService,
    public fb: FormBuilder,
    public dialog: MatDialog) {
    this.auth.getAuthSubject().subscribe(async (userId) => {
      this.userId = userId;
      if (userId != null) {
        try {
          let res = await axios.get(`${environment.BaseServerUrl}/get-profile`, {
            params: {
              userId: userId
            }
          });
          console.log(res.data);
          this.profile = res.data;
          this.profile.avatarUrl = `${environment.BaseServerUrl}/avatars/${userId}-avatar.jpg`;
          this.profile.bgUrl = `${environment.BaseServerUrl}/bgs/${userId}-bg.jpg`;

          if (this.profile.signature == null) {
            this.profile.signature = '对未来的最大慷慨，是把一切献给现在。';
          }
          if (this.profile.introduction == null) {
            this.profile.introduction = '每一条道路上都有出发的人， 每个人头顶上都有一方天空， 每一方天空上都有莫测的云， 每一朵云都兆示着命运。 无声的选择方向，一颗星辰或者一双眼睛， 人怎样选择世界， 世界就怎样地选择人。';
          }
        } catch (err) {

        }
      }
    });
  }
  async ngOnInit() {
    this.form = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }
  async submitForm() {
    console.log('登录', this.form.value);
    try {
      await this.auth.login(this.form.value.email, this.form.value.password);
      console.log('登录成功');

    } catch (err) {
      console.log('失败', err);
      if (err.response.status === 404) {
        console.log('此用户未注册');
        return;
      }
      console.log('登录失败', err.response.status);
    }
  }
  async signUp() {
    console.log('注册', this.form.value);
    try {
      await this.auth.signUp(this.form.value.email, this.form.value.password);
    } catch (err) {
      console.log('注册失败', err);
    }
  }

  openDialog(): void {

    const dialogRef = this.dialog.open(DialogComponent, {
      // height: '100%',
      // width: '100%',
      data: { name: this.userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
  editProfile(): void {

    const dialogRef = this.dialog.open(EditProfileComponent, {
      // height: '100%',
      // width: '100%',
      data: { name: this.userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  async getBgImg(event) {
    this.bgFile = event.target.files[0];
    this.profile.bgUrl = window.URL.createObjectURL(event.srcElement.files[0]);

    try {
      await this.uploadFile('bg');
    } catch (err) {
      console.log(err)
    }
  }
  async getAvatarImg(event) {
    this.avatarFile = event.target.files[0];
    this.profile.avatarUrl = window.URL.createObjectURL(event.srcElement.files[0]);
    try {
      await this.uploadFile('avatar');
    } catch (err) {
      console.log(err)
    }
  }

  async uploadFile(type: 'bg' | 'avatar') {

    let fd = new FormData();
    fd.append(type, type === 'bg' ? this.bgFile : this.avatarFile);
    try {
      await axios.request({
        url: type === 'bg' ? `${environment.BaseServerUrl}/upload-bg` : `${environment.BaseServerUrl}/upload-avatar`,
        method: 'post',
        headers: {
          // 'Content-Type':'application/x-www-form-urlencoded'
          'Content-Type': 'multipart/form-data'
        },
        data: fd
      });
    } catch (err) {
      console.log('出错', err);
      throw err;
    }
  }
  async updateProfile() {
    try {
      await axios.request({
        url: `${environment.BaseServerUrl}/update-profile`,
        method: 'post',
        data: {
          userId: this.userId,
          info: {
            userId: this.userId,
            avatarUrl: this.profile.avatarUrl,
            bgUrl: this.profile.bgUrl,
            signature: this.profile.signature,
            introduction: this.profile.introduction
          }
        }
      });
    } catch (err) {
      console.log('出错', err);
      throw err;
    }
  }

}
