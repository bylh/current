import { environment } from './../../environments/environment';
import { DialogComponent } from './dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material';
import axios from 'axios';
import { AuthService } from '../auth.service';
axios.defaults.withCredentials = true    // 请求携带cookie信息  
export interface DialogData {
  animal: string;
  name: string;
}
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
  animal: string;
  name: string;


  form: FormGroup;
  matcher = new MyErrorStateMatcher();
  constructor(
    public auth: AuthService,
    public fb: FormBuilder,
    public dialog: MatDialog) { }
  ngOnInit() {
    this.form = this.fb.group({
      'email': new FormControl('', [
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

  async logout() {
    console.log('登出', this.form.value);
    try {
      await this.auth.logOut()
      console.log('登出成功');
    } catch (err) {
      console.log('登出失败', err);
    }
  }

  async getMarkerList() {
    try {
      const res = await axios.request({
        url: `${environment.BaseServerUrl}/get-gate-marketlist`,
        method: 'get',
      });
      console.log('res:', res);
    } catch (err) {
      console.log('err:', err);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      // height: '400px',
      // width: '600px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}
