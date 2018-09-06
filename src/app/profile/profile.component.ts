
import { DialogComponent } from './dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material';
import axios from 'axios';
import { AuthService } from '../auth.service';
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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      // height: '400px',
      // width: '600px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.animal = result;
    });
  }
}
