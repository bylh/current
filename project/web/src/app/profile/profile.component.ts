import { AppService } from './../app.service';

import { environment } from './../../environments/environment';

import { DialogComponent } from './dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material';
import { AuthService } from '../auth.service';
import axios from '../../common/rewrite/axios';
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
  fileUpload: any = null;
  file: any;
  html = `<h2>显示图片</h2>`;

  avatarUrl: string = 'https://bit.bylh.top/avatars/default.jpg';
  bgUrl: string = 'https://bit.bylh.top/images/defaultbg.jpg';
  description = '对未来的最大慷慨，是把一切献给现在。';

  form: FormGroup;
  matcher = new MyErrorStateMatcher();
  constructor(
    public auth: AuthService,
    public fb: FormBuilder,
    public dialog: MatDialog) {
      this.auth.getAuthSubject().subscribe((userId) => {
        this.avatarUrl = `${environment.BaseServerUrl}/avatars/${userId}-avatar.jpg`;
        this.bgUrl = `${environment.BaseServerUrl}/imgs/${userId}-bg.jpg`;
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
      data: { name: this.auth.getAuthSubject().getValue() }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  getImg(event) {
    this.file = event.target.files[0];
    this.fileUpload = window.URL.createObjectURL(event.srcElement.files[0]);

    console.log('url:', this.fileUpload);
  }
  async uploadFile() {
    console.log(this.file);
    let fd = new FormData();
    fd.append('file', this.file);
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    // await axios.post(`${environment.BaseServerUrl}/upload-img`, fd, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // });
    try {
      await axios.request({
        url: `${environment.BaseServerUrl}/upload-img`,
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
          userId: this.auth.getAuthSubject().getValue(),
          info: {
            avatarUrl: this.avatarUrl,
            bgUrl: this.bgUrl
          }
        }
      });
    } catch (err) {
      console.log('出错', err);
      throw err;
    }
  }

}
